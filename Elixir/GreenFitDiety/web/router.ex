defmodule Greenfitdiety.Router do
  use Greenfitdiety.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Greenfitdiety.Plugs.SetUser
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Greenfitdiety do
    pipe_through :browser # Use the default browser stack
    get "/", AuthController, :start
    get "/login", AuthController, :login_page
    post "/login", AuthController, :login_with_password
    get "/password", UserController, :password
    get "/contact", UserController, :contact
    get "/users/:id/settings", UserController, :settings
    post "/users/:id/password", UserController, :update_password
    resources "/users", UserController
    resources "/users/:user_id/diets", DietController
    resources "/users/:user_id/changes", ChangeController
  end

  scope "/auth", Greenfitdiety do
    pipe_through :browser
    get "/api_login", AuthController, :api_login
    get "/notallowed", AuthController, :notallowed
    get "/signout", AuthController, :signout
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
  end

  scope "/api", Greenfitdiety do
    pipe_through :api
    get "/users", UserController, :users_api
    get "/users/:id", UserController, :user_api
    get "/users/:user_id/diets", DietController, :diets_api
    get "/users/:user_id/diets/:id", DietController, :diet_api
    get "/users/:user_id/changes", ChangeController, :changes_api
    get "/users/:user_id/changes/:id", ChangeController, :change_api
    get "/empty", UserController, :empty
  end
end
