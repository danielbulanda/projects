defmodule Greenfitdiety.DietController do
  use Greenfitdiety.Web, :controller
  plug Greenfitdiety.Plugs.RequireAuth when action in [:index, :new, :create, :update, :edit, :delete, :show]
  plug Greenfitdiety.Plugs.CheckUserRole when action in [:index, :show]
  plug Greenfitdiety.Plugs.CheckUserRoleOnlyAdmin when action in [:edit, :update]
  # plug Greenfitdiety.Plugs.AppToken when action in [:diets_api, :diet_api]
  # plug Greenfitdiety.Plugs.AdminToken when action in [:diets_api]
  # plug Greenfitdiety.Plugs.ResourcePremission when action in [:diet_api]
  alias Greenfitdiety.Diet
  alias Greenfitdiety.User

  def index(conn, %{"user_id" => user_id}) do
    user = Repo.get User, user_id
    days = [{0, "Poniedziałek"}, {1, "Wtorek"}, {2, "Środa"}, {3, "Czwartek"}, {4, "Piątek"}, {5, "Sobota"}, {6, "Niedziela"}]
    diets = for iday <- days do
      {_i, day} = iday
      insert_or_update(user_id, day)
    end
    render conn, "index.html", onuser: user, days: days, diets: diets
  end

  def edit(conn, %{"user_id" => user_id, "id" => diet_id}) do
    user = Repo.get User, String.to_integer(user_id)
    case Repo.get Diet, String.to_integer(diet_id) do
      nil ->
        conn
        |> put_flash(:error, "Wystąpił problem z bazą danych")
        |> redirect(to: diet_path(conn, :index, user))
      diet ->
        changeset = Diet.changeset(diet)
        render conn, "edit.html", onuser: user, changeset: changeset, diet: diet
    end
  end

  def update(conn, %{"user_id" => user_id, "id" => diet_id, "diet" => new_diet}) do
    old_diet = Repo.get!(Diet, diet_id)
    changeset = Diet.changeset(old_diet, new_diet)
    case Repo.update(changeset) do
      {:ok, _diet} ->
        conn
        |> put_flash(:info, "Zmiany zostały zapisane")
        |> redirect(to: diet_path(conn, :index, user_id))
      {:error, _reason} ->
        conn
        |> put_flash(:error, "Wystąpił problem z bazą danych")
        |> redirect(to: user_path(conn, :show, user_id))
    end
  end

  defp insert_or_update(user_id, name) do
    user_id = String.to_integer user_id
    ids = Repo.all(from d in "diets", where: d.user_id == ^user_id and d.diet_name == ^name, select: d.id)
    case ids do
      [] ->
        diet_params = %{diet_name: name, user_id: user_id}
        changeset = Diet.changeset(%Diet{}, diet_params)
        Repo.insert!(changeset)
      [id | _] ->
        Repo.get!(Diet, id)
    end
  end

  def show(conn, %{"user_id" => user_id}) do
    redirect conn, to: diet_path(conn, :index, user_id)
  end

  def externalCreate(user_id) do
    user = Repo.get User, user_id
    days = [{0, "Poniedziałek"}, {1, "Wtorek"}, {2, "Środa"}, {3, "Czwartek"}, {4, "Piątek"}, {5, "Sobota"}, {6, "Niedziela"}]
    diets = for iday <- days do
      {_i, day} = iday
      insert_or_update(user_id, day)
    end
  end

  def diets_api(conn, %{"user_id" => user_id}) do
    diets = Repo.all(from d in Diet, where: d.user_id == ^user_id, select: d)
    render(conn, "index.json", diets: diets)
  end
  def diet_api(conn, %{"id" => diet_id}) do
    diet = Repo.get!(Diet, diet_id)
    render(conn, "show.json", diet: diet)
  end

end
