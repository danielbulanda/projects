defmodule Greenfitdiety.User do
  use Greenfitdiety.Web, :model

  schema "users" do
    field       :email,             :string, size: 50
    field       :password,          :string, default: "F8EB2D747726901A7E81D44D0F7C9AEEDD"
    field       :provider,          :string, size: 25
    field       :token,             :string
    field       :first_name,        :string, size: 25
    field       :last_name,         :string, size: 25
    field       :phone,             :string, size: 20
    field       :weight,            :integer
    field       :height,            :integer
    field       :age,               :integer
    field       :metabolic_age,     :integer
    field       :fat,               :integer
    field       :visceral_fat,      :integer
    field       :avatar,            :binary
    field       :role,              :string, size: 20, default: "brak"
    has_many    :diets,             Greenfitdiety.Diet, on_delete: :delete_all
    has_many    :changes,           Greenfitdiety.Change, on_delete: :delete_all
    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email,
                     :password,
                     :provider,
                     :token,
                     :first_name,
                     :last_name,
                     :phone,
                     :weight,
                     :height,
                     :age,
                     :metabolic_age,
                     :fat,
                     :visceral_fat,
                     :avatar,
                     :role])
    |> validate_required([:email])
    |> unique_constraint(:email)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:email, min: 3)
    |> validate_length(:password, min: 5)
  end

end
