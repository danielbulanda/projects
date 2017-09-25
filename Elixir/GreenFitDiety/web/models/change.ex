defmodule Greenfitdiety.Change do
  use Greenfitdiety.Web, :model

  schema "changes" do
    field       :date,              :date
    field       :weight,            :integer
    field       :metabolic_age,     :integer
    field       :fat,               :integer
    field       :visceral_fat,      :integer
    field       :labs,              :string
    field       :others,            :string
    belongs_to  :user,              Greenfitdiety.User
    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:date, :weight, :metabolic_age, :fat, :visceral_fat, :labs, :others, :user_id])
    |> validate_required([:date])
  end
end
