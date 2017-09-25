defmodule Greenfitdiety.Diet do
  use Greenfitdiety.Web, :model

  schema "diets" do
    field       :diet_name,         :string, size: 25
    field       :diet_img,          :binary
    field       :m1_name,        :string, size: 25
    field       :m1_description, :string
    field       :m1_time,        :string, size: 25
    field       :m2_name,        :string, size: 25
    field       :m2_description, :string
    field       :m2_time,        :string, size: 25
    field       :m3_name,        :string, size: 25
    field       :m3_description, :string
    field       :m3_time,        :string, size: 25
    field       :m4_name,        :string, size: 25
    field       :m4_description, :string
    field       :m4_time,        :string, size: 25
    field       :m5_name,        :string, size: 25
    field       :m5_description, :string
    field       :m5_time,        :string, size: 25
    field       :m6_name,        :string, size: 25
    field       :m6_description, :string
    field       :m6_time,        :string, size: 25
    field       :m7_name,        :string, size: 25
    field       :m7_description, :string
    field       :m7_time,        :string, size: 25
    belongs_to  :user,              Greenfitdiety.User
    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:diet_name,
                     :diet_img,
                     :m1_name,
                     :m1_description,
                     :m1_time,
                     :m2_name,
                     :m2_description,
                     :m2_time,
                     :m3_name,
                     :m3_description,
                     :m3_time,
                     :m4_name,
                     :m4_description,
                     :m4_time,
                     :m5_name,
                     :m5_description,
                     :m5_time,
                     :m6_name,
                     :m6_description,
                     :m6_time,
                     :m7_name,
                     :m7_description,
                     :m7_time,
                     :user_id])
    |> validate_required([])
  end

end
