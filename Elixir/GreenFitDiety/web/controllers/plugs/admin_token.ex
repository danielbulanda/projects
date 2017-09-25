# defmodule Greenfitdiety.Plugs.AdminToken do
#   import Plug.Conn
#   import Phoenix.Controller
#   import Greenfitdiety.Router.Helpers
#   @admin_token "nG5E2VG00KEunScdw0UD"
#
#   def init(_params) do
#   end
#
#   def call(conn, _params) do
#     if get_req_header(conn, "admin_token") == [@admin_token] do
#       conn
#     else
#       conn
#       |> redirect(to: user_path(conn, :empty))
#       |> halt()
#     end
#   end
#
# end
