defmodule Greenfitdiety.AuthController do
  use Greenfitdiety.Web, :controller
  plug Ueberauth
  alias Greenfitdiety.User
  alias Greenfitdiety.Diet
  alias Greenfitdiety.Change
  alias Greenfitdiety.Identicon

  def start(conn, _params) do
    cond do
      conn.assigns.user -> redirect(conn, to: user_path(conn, :index))
      true -> redirect(conn, to: auth_path(conn, :login_page))
    end
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, %{"provider" => provider}) do
    user_params = %{email: String.downcase(auth.info.email), provider: provider, token: auth.credentials.token,
                  first_name: auth.info.first_name, last_name: auth.info.last_name,
                  phone: auth.info.phone, avatar: auth.info.image}
    changeset = User.changeset(%User{}, user_params)
    signin(conn, changeset)
  end

  defp signin(conn, changeset) do
    case insert_or_update_user(conn, changeset) do
      {:ok, user} ->
        {flash, msg, path} = if user.role == "brak" || Map.has_key?(changeset.changes, :provider) == false do
          verify conn, user
        else
          name = if(user.first_name) do user.first_name else user.email end
          {:info,  "Witaj #{name}!", user_path(conn, :index)}
        end
        conn = conn
        |> put_flash(flash, msg)
        |> put_session(:user_id, user.id)
        redirect(conn, to: path)
      {:error, _reason} ->
        conn
        |> put_flash(:error, "Nie udało się zalogować...")
        |> redirect(to: auth_path(conn, :login_page))
    end
  end

  def insert_or_update_user(conn, changeset) do
    case Repo.get_by(User, email: changeset.changes.email) do
      nil ->
        Identicon.main(changeset.changes.email)
        user = Repo.insert!(changeset)
        Greenfitdiety.ChangeController.externalUpdate(conn, user)
        Greenfitdiety.DietController.externalCreate(Kernel.inspect(user.id))
        {:ok, user}
      user ->
        {:ok, user}
    end
  end

  def signout(conn, _params) do
    conn
    |> put_session(:user_id, nil)
    |> put_flash(:info, "Wylogowano")
    |> redirect(to: auth_path(conn, :login_page))
  end

  def login_page(conn, _params) do
    render conn, "login.html"
  end

  def login_with_password(conn, _params) do
    case conn.body_params["login_pass"]["email"] == "" do
      false ->
        user_params = %{email: String.downcase(conn.body_params["login_pass"]["email"])}
        changeset = User.changeset(%User{}, user_params)
        signin(conn, changeset)
      true ->
        conn
        |> put_flash(:error, "Wpisz adres email")
        |> redirect(to: auth_path(conn, :login_page))
    end
  end

  def hash_password(password) do
    cond  do
      password == "" -> nil
      password == nil -> nil
      true ->  Base.encode16(:crypto.hash :md5, password) <> "DD"
    end
  end

  def verify(conn, user) do
    password = hash_password conn.body_params["login_pass"]["password"]
    name = if(user.first_name) do user.first_name else user.email end
    cond do
      user.password == nil ->
        {nil, nil, user_path(conn, :password)} #formularz kontaktu z ulą
      password == "" || password == nil ->
        {nil, nil, user_path(conn, :password)} #formularz hasła + error
      String.equivalent?(user.password, password) ->
        if user.role == "brak" do
          old_user = Repo.get(User, user.id)
          changeset = User.changeset old_user, %{role: "klient"}
          Repo.update changeset
        end
        {:info,  "Witaj #{name}!", user_path(conn, :index)}
      true ->
        {:error, "Nieprawidłowe hasło", user_path(conn, :password)} #formularz hasła + error
    end
  end

  def notallowed(conn, _params) do
    conn
    |> put_flash(:error, "Korzystanie z serwisu wymaga zalogowania")
    |> redirect(to: auth_path(conn, :login_page))
  end

  def api_login(conn, _params) do
    [email] = get_req_header(conn, "email")
    [password] = get_req_header(conn, "password")
    case Repo.get_by(User, email: email) do
      nil ->
        conn
        |> put_status(401)
        |> render(conn, "error.json", msg: "Bad email")
      user ->
        case hash_password(password) == user.password do
          true ->
            new_conn = Guardian.Plug.api_sign_in(conn, user)
            jwt = Guardian.Plug.current_token(new_conn)
            {:ok, claims} = Guardian.Plug.claims(new_conn)
            exp = Map.get(claims, "exp")

            dietsRaw = Repo.all(from d in Diet, where: d.user_id == ^user.id, select: d)
            diets = Enum.map(dietsRaw, fn (diet) ->
              Map.drop(
                Map.from_struct(diet), [:__meta__, :changes, :diets, :inserted_at, :updated_at, :user]
              )
            end)
            |> Map.new(fn (diet) ->
              name = case diet.diet_name do
                "poniedziałek" -> "monday"
                "wtorek" -> "tuesday"
                "środa" -> "wednesday"
                "czwartek" -> "thursday"
                "piątek" -> "friday"
                "sobota" -> "saturday"
                "niedziela" -> "sunday"
                "Poniedziałek" -> "monday"
                "Wtorek" -> "tuesday"
                "Środa" -> "wednesday"
                "Czwartek" -> "thursday"
                "Piątek" -> "friday"
                "Sobota" -> "saturday"
                "Niedziela" -> "sunday"
              end
              {name, diet}
            end)

            changesRaw = Repo.all(from c in Change, where: c.user_id == ^user.id, select: c)
            changes = Enum.map(changesRaw, fn (change) ->
              Map.drop(
                Map.from_struct(change), [:__meta__, :changes, :diets, :inserted_at, :updated_at, :user]
              ) end
            )

            IO.puts "++++++++++"
            IO.inspect diets

            user_data = Map.drop(Map.from_struct(user), [:__meta__, :changes, :diets, :inserted_at, :updated_at])
            new_conn
            |> put_resp_header("authorization", "Bearer #{jwt}")
            |> render("login.json", jwt: jwt, exp: exp, user: user_data, diets: diets, changes: changes)
          false ->
            conn
            |> put_status(401)
            |> render(conn, "error.json", msg: "Bad password")
        end
    end
  end

end
