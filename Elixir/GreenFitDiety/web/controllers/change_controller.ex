defmodule Greenfitdiety.ChangeController do
  use Greenfitdiety.Web, :controller
  plug Greenfitdiety.Plugs.RequireAuth when action in [:index, :new, :create, :update, :edit, :delete, :show]
  plug Greenfitdiety.Plugs.CheckUserRole when action in [:index, :show]
  plug Greenfitdiety.Plugs.CheckUserRoleOnlyAdmin when action in [:new, :create, :update, :edit, :delete]
  # plug Greenfitdiety.Plugs.AppToken when action in [:changes_api, :change_api]
  # plug Greenfitdiety.Plugs.AdminToken when action in [:changes_api]
  # plug Greenfitdiety.Plugs.ResourcePremission when action in [:change_api]
  alias Greenfitdiety.Change
  alias Greenfitdiety.User

  def index(conn, %{"user_id" => user_id}) do
    user = Repo.get User, user_id
    id_int = String.to_integer(user_id)
    changes = Repo.all(from c in Change, where: c.user_id == ^id_int, select: c)
    render conn, "index.html", onuser: user, changes: changes
  end

  def edit(conn, %{"user_id" => user_id, "id" => change_id}) do
    user = Repo.get User, String.to_integer(user_id)
    case Repo.get Change, String.to_integer(change_id) do
      nil ->
        conn
        |> put_flash(:error, "Wystąpił problem z bazą danych")
        |> redirect(to: change_path(conn, :index, user))
      change ->
        changeset = Change.changeset(change)
        render conn, "edit.html", onuser: user, changeset: changeset, change: change
    end
  end

  def update(conn, %{"user_id" => user_id, "id" => change_id, "change" => new_change}) do
    old_change = Repo.get!(Change, change_id)
    changeset = Change.changeset(old_change, new_change)
    case Repo.update(changeset) do
      {:ok, _change} ->
        id_int = String.to_integer(user_id)
        internalUpdate(conn, id_int)
        conn
        |> put_flash(:info, "Zmiany zostały zapisane")
        |> redirect(to: change_path(conn, :index, user_id))
      {:error, _reason} ->
        conn
        |> put_flash(:error, "Wystąpił problem z bazą danych")
        |> redirect(to: change_path(conn, :index, user_id))
    end
  end

  def show(conn, %{"user_id" => user_id}) do
    redirect conn, to: change_path(conn, :index, user_id)
  end

  def new(conn, %{"user_id" => user_id}) do
    user = Repo.get User, String.to_integer(user_id)
    changeset = Change.changeset(%Change{})
    render conn, "new.html", onuser: user, changeset: changeset
  end

  def create(conn, %{"user_id" => user_id, "change" => new_change}) do
    id_int = String.to_integer(user_id)
    {:ok, date_date} = Date.from_iso8601(new_change["date"])
    user = Repo.get User, id_int
    ids = Repo.all(from d in "changes", where: d.user_id == ^id_int and d.date == ^date_date, select: d.id)
    case ids do
      [] ->
        change = Map.merge(new_change, %{"user_id" => user_id})
        changeset = Change.changeset(%Change{}, change)
        change = Repo.insert!(changeset)
        internalUpdate(conn, change.user_id)
        conn
        |> put_flash(:info, "Dodano nowy wpis")
        |> redirect(to: change_path(conn, :index, user))
      [id | _] ->
        change = Repo.get!(Change, id)
        conn
        |> put_flash(:info, "Istnieje już taki wpis")
        |> redirect(to: change_path(conn, :edit, user, change))
    end
  end

  def delete(conn, %{"user_id" => user_id, "id" => change_id}) do
    user = Repo.get User, String.to_integer(user_id)
    Repo.get(Change, change_id)
    |> Repo.delete!
    id_int = String.to_integer(user_id)
    internalUpdate(conn, id_int)
    conn
    |> put_flash(:info, "Usunięto wpis")
    |> redirect(to: change_path(conn, :index, user))
  end

  def externalUpdate(conn, user) do
    now = Date.utc_today()
    month = if now.month <= 9 do "0" <> Kernel.inspect(now.month) end
    day = if now.day <= 9 do "0" <> Kernel.inspect(now.day) end
    date = Kernel.inspect(now.year) <> "-" <> month <> "-" <> day
    initialChanges = %{
      "date" => date,
      "weight" => user.weight,
      "metabolic_age" => user.metabolic_age,
      "fat" => user.fat,
      "visceral_fat" => user.visceral_fat
    }
    id_int = user.id
    {:ok, date_date} = Date.from_iso8601(initialChanges["date"])
    change = Map.merge(initialChanges, %{"user_id" => Kernel.inspect(user.id)})
    ids = Repo.all(from d in "changes", where: d.user_id == ^id_int and d.date == ^date_date, select: d.id)
    case ids do
      [] ->
        changeset = Change.changeset(%Change{}, change)
        Repo.insert!(changeset)
      [id | _] ->
        oldChange = Repo.get!(Change, id)
        changeset = Change.changeset(oldChange, change)
        Repo.update!(changeset)
    end
  end

  def internalUpdate(conn, id) do
    actual = Repo.all(from c in Change,
      where: c.user_id == ^id,
      select: c,
      order_by: [desc: c.date])
    #change = %{}
    change = Enum.reduce(actual, %{}, fn (item, acc) ->
      temp = acc
      if (item.weight != nil && !Map.has_key?(temp, :weight)) do temp = Map.put(temp, :weight, item.weight) end
      if (item.fat != nil && !Map.has_key?(temp, :fat)) do temp = Map.put(temp, :fat, item.fat) end
      if (item.metabolic_age != nil && !Map.has_key?(temp, :metabolic_age)) do temp = Map.put(temp, :metabolic_age, item.metabolic_age) end
      if (item.visceral_fat != nil && !Map.has_key?(temp, :visceral_fat)) do temp = Map.put(temp, :visceral_fat, item.visceral_fat) end
      temp
    end)
    Greenfitdiety.UserController.externalUpdate(conn, id, change)
  end

  def changes_api(conn, %{"user_id" => user_id}) do
    changes = Repo.all(from c in Change, where: c.user_id == ^user_id, select: c)
    render(conn, "index.json", changes: changes)
  end
  def change_api(conn, %{"id" => change_id}) do
    change = Repo.get!(Change, change_id)
    render(conn, "show.json", change: change)
  end

end
