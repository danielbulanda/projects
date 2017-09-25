defmodule Greenfitdiety.UserController do
  use Greenfitdiety.Web, :controller
  alias Greenfitdiety.User
  plug Greenfitdiety.Plugs.RequireAuth when action in [:index, :new, :create, :update, :edit, :delete, :show]
  plug Greenfitdiety.Plugs.CheckUserRole when action in [:edit, :update, :delete, :show]
  plug Greenfitdiety.Plugs.CheckUserRoleOnlyAdmin when action in [:new, :create]
  # plug Greenfitdiety.Plugs.AppToken when action in [:users_api, :user_api]
  # plug Greenfitdiety.Plugs.AdminToken when action in [:users_api]
  # plug Greenfitdiety.Plugs.ResourcePremission when action in [:user_api]
  alias Greenfitdiety.AuthController

  def index(conn, _params) do
    users = for user <- Repo.all(User) do
      Map.from_struct user
    end
    user = Repo.get!(User, conn.assigns.user.id)
    render conn, "index.html", users: users, user: user
  end

  def password(conn, _params) do
    render conn, "password.html"
  end

  def contact(conn, _params) do
    render conn, "contact.html"
  end

  def delete(conn, %{"id" => user_id}) do
    Repo.get(User, user_id)
    |> Repo.delete!
    {id, _} = Integer.parse(user_id)
    if id == conn.assigns.user.id do
      conn
      |> put_flash(:info, "Użytkownik usunięty")
      |> redirect(to: auth_path(conn, :signout))
    else
      conn
      |> put_flash(:info, "Użytkownik usunięty")
      |> redirect(to: user_path(conn, :index))
    end
  end

  def show(conn, %{"id" => user_id}) do
    user = Repo.get!(User, user_id)
    render conn, "show.html", user_showed: user
  end

  def edit(conn, %{"id" => user_id}) do
    user = Repo.get!(User, user_id)
    changeset = User.changeset(user)
    render conn, "edit.html", user_edited: user, changeset: changeset
  end

  def update(conn, %{"id" => user_id, "user" => new_user}) do
    old_user = Repo.get(User, user_id)
    setPassword(user_id, new_user["password"])
    new_user = Map.delete(new_user, "password")
    # new_user = if(conn.assigns.user.role=="administrator") do
    #   %{new_user | "password" => AuthController.hash_password(new_user["password"])}
    # end
    changeset = User.changeset(old_user, new_user)
    case Repo.update(changeset) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "Zmiany zostały zapisane")
        |> redirect(to: user_path(conn, :show, user))
      {:error, _reason} ->
        conn
        |> put_flash(:error, "Zmiany nie zostały zapisane")
        |> redirect(to: user_path(conn, :show, old_user))
    end
  end

  def new(conn, _params) do

    case Map.has_key?(conn.assigns, :user) do
      false ->
        conn
        |> put_flash(:error, "Korzystanie z serwisu wymaga zalogowania")
        |> redirect(to: auth_path(conn, :login_page))
      true ->
        changeset = User.changeset(%User{})
        render conn, "new.html", changeset: changeset
    end

  end

  def create(conn, %{"user" => %{"email" => email}}) do
    changeset = User.changeset(%User{}, %{email: email})
    case AuthController.insert_or_update_user(conn, changeset) do
      {:ok, user} ->
        redirect(conn, to: user_path(conn, :edit, user.id))
      {:error, _reason} ->
        conn
        |> put_flash(:error, "Nie udało się zalogować...")
        |> redirect(to: user_path(conn, :index))
    end
  end

  def settings(conn, _params) do
    render conn, "settings.html"
  end

  def update_password(conn, %{"id" => id, "pswchange" => pswchange}) do
    old = conn.assigns.user.password
    case old == AuthController.hash_password(pswchange["old_password"]) do
      true ->
        if pswchange["new_password"] == pswchange["new_password_repeat"] do
          old_user = Repo.get(User, id)
          changeset = User.changeset(old_user, %{password: AuthController.hash_password(pswchange["new_password"])})
          case Repo.update(changeset) do
            {:ok, _user} ->
              conn
              |> put_flash(:info, "Hasło zostało zmienione")
              |> redirect(to: user_path(conn, :show, id))
            {:error, _reason} ->
              conn
              |> put_flash(:error, "Nie udało się zmienić hasła")
              |> redirect(to: user_path(conn, :settings, id))
          end
        else
          conn
          |> put_flash(:error, "Nowe hasła nie są takie same")
          |> redirect(to: user_path(conn, :settings, id))
        end
      false ->
        conn
        |> put_flash(:error, "Niepoprawne stare hasło")
        |> redirect(to: user_path(conn, :settings, id))
    end
  end

  def externalUpdate(conn, user_id, change) do
    old_user = Repo.get(User, user_id)
    changeset = User.changeset(old_user, change)
    Repo.update!(changeset)
  end

  def setPassword(id, password) do
    old_user = Repo.get(User, id)
    if (String.length(password) > 3) do
      changeset = User.changeset(old_user, %{password: AuthController.hash_password(password)})
      Repo.update!(changeset)
    end
  end

  def users_api(conn, _params) do

    get_req_header(conn, "token")
    users = Repo.all(User)
    render(conn, "index.json", users: users)
  end
  def user_api(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    render(conn, "show.json", user: user)
  end

  def empty(conn, _params) do
    render conn, "empty.json"
  end

end
