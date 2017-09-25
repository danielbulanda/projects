# defmodule Greenfitdiety.Plugs.AppToken do
#   import Plug.Conn
#   import Phoenix.Controller
#   import Greenfitdiety.Router.Helpers
#   @app_token "vGt7lHBG4oYC3isYKjx8"
#
#   def init(_params) do
#   end
#
#   def call(conn, _params) do
#     if get_req_header(conn, "app_token") == [@app_token] do
#       conn
#     else
#       conn
#       |> redirect(to: user_path(conn, :empty))
#       |> halt()
#     end
#   end
#
# end
