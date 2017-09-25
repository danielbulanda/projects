# defmodule Greenfitdiety.Plugs.ResourcePremission do
#   import Plug.Conn
#   import Phoenix.Controller, only: [redirect: 2]
#   import Greenfitdiety.Router.Helpers
#   alias Greenfitdiety.Repo
#   alias Greenfitdiety.User
#   @admin_token "nG5E2VG00KEunScdw0UD"
#
#   def init(_params) do
#   end
#
#   def call(conn, _params) do
#     id_var = if length(conn.path_info)>=3 do
#       {:ok, uri} = Enum.fetch(conn.path_info, 2)
#       cond do
#         uri == "diets" -> "user_id"
#         uri == "changes" -> "user_id"
#         true -> "id"
#       end
#     else
#       "id"
#     end
#     %{params: %{^id_var => user_id}} = conn
#     {id, _} = Integer.parse(user_id)
#
#     user = Repo.get!(User, id)
#     hash = Greenfitdiety.AuthController.hash_password(user.email)
#     IO.puts "++++++++++++++resuorce-token++++++++++++++"
#     IO.inspect hash
#     IO.puts "++++++++++++++++++++++++++++++++++++++++++"
#     if get_req_header(conn, "admin_token") == [@admin_token] do
#       conn
#     else
#       if get_req_header(conn, "client_token") == [hash] do
#         conn
#       else
#         conn
#         |> redirect(to: user_path(conn, :empty))
#         |> halt()
#       end
#     end
#   end
#
# end
