defmodule Greenfitdiety.Plugs.RequireAuth do
  import Plug.Conn
  import Phoenix.Controller
  alias Greenfitdiety.Router.Helpers

  def init(_params) do
  end

  def call(conn, _params) do
    if Map.has_key?(conn.assigns, :user) do
      if conn.assigns.user.role != "brak" do
        conn
      else
        conn
        |> put_flash(:error, "Dostęp możliwy po wpisaniu hasła")
        |> redirect(to: Helpers.user_path(conn, :password))
        |> halt()
      end
    else
      conn
      |> put_flash(:error, "Nie jeseteś zalogowany")
      |> redirect(to: Helpers.auth_path(conn, :login_page))
      |> halt()
    end
  end
end
