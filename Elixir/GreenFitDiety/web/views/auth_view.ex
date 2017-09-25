defmodule Greenfitdiety.AuthView do
  use Greenfitdiety.Web, :view

  def render("error.json", %{msg: msg}) do
    %{
      status: "error",
      msg: msg
    }
  end

  def render("login.json", %{jwt: jwt, exp: exp, user: user, diets: diets, changes: changes}) do
    %{
      status: "ok",
      jwt: jwt,
      exp: exp,
      user: user,
      diets: diets,
      changes: changes
    }
  end

end
