defmodule Greenfitdiety.Plugs.CheckUserRole do
  import Plug.Conn
  import Phoenix.Controller
  import Greenfitdiety.Router.Helpers

  def init(_params) do
  end

  def call(conn, _params) do
    id_var = if length(conn.path_info)>=3 do
      {:ok, uri} = Enum.fetch(conn.path_info, 2)
      cond do
        uri == "diets" -> "user_id"
        uri == "changes" -> "user_id"
        true -> "id"
      end
    else
      "id"
    end

    %{params: %{^id_var => user_id}} = conn
    {id, _} = Integer.parse(user_id)
    if conn.assigns.user.role != "administrator" do
      if conn.assigns.user.id == id do
        conn
      else
        conn
        |> put_flash(:error, "Dostęp tylko dla administratorów")
        |> redirect(to: user_path(conn, :index))
        |> halt()
      end
    else
      conn
    end
  end

end
