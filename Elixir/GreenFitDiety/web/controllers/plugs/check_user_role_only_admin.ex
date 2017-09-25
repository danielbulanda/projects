defmodule Greenfitdiety.Plugs.CheckUserRoleOnlyAdmin do
  import Plug.Conn
  import Phoenix.Controller
  import Greenfitdiety.Router.Helpers

  def init(_params) do
  end

  def call(conn, _params) do
    if conn.assigns.user.role != "administrator" do
      conn
      |> put_flash(:error, "Funkcja dostępna tylko dla administratorów")
      |> redirect(to: user_path(conn, :index))
      |> halt()
    else
      conn
    end
  end

end
