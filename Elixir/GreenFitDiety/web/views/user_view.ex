defmodule Greenfitdiety.UserView do
  use Greenfitdiety.Web, :view

  def render("index.json", %{users: users}) do
    render_many(users, Greenfitdiety.UserView, "user.json")
  end

  def render("show.json", %{user: user}) do
    render_one(user, Greenfitdiety.UserView, "user.json")
  end

  def render("empty.json", _params) do
    []
  end

  def render("user.json", %{user: user}) do
    %{id:               user.id,
      email:            user.email,
      password:         user.password,
      provider:         user.provider,
      token:            user.token,
      first_name:       user.first_name,
      last_name:        user.last_name,
      phone:            user.phone,
      weight:           user.weight,
      height:           user.height,
      age:              user.age,
      metabolic_age:    user.age,
      fat:              user.fat,
      visceral_fat:     user.visceral_fat,
      avatar:           user.avatar,
      role:             user.role,
      inserted_at:      user.inserted_at,
      updated_at:       user.updated_at
      }
  end

end
