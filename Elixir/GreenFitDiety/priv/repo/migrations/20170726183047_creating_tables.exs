defmodule Greenfitdiety.Repo.Migrations.CreatingTables do
  use Ecto.Migration

  def change do

    create table(:users) do
      add :email,             :string, size: 50
      add :password,          :string, default: "F8EB2D747726901A7E81D44D0F7C9AEEDD"
      add :provider,          :string, size: 25
      add :token,             :string
      add :first_name,        :string, size: 25
      add :last_name,         :string, size: 25
      add :phone,             :string, size: 20
      add :weight,            :integer
      add :height,            :integer
      add :age,               :integer
      add :metabolic_age,     :integer
      add :fat,               :integer
      add :visceral_fat,      :integer
      add :avatar,            :binary
      add :role,              :string, size: 20, default: "brak"
      timestamps()
    end

    create table(:diets) do
      add :diet_name,         :string, size: 25
      add :diet_img,          :binary
      add :m1_name,           :string, size: 25
      add :m1_description,    :text
      add :m1_time,           :string, size: 25
      add :m2_name,           :string, size: 25
      add :m2_description,    :text
      add :m2_time,           :string, size: 25
      add :m3_name,           :string, size: 25
      add :m3_description,    :text
      add :m3_time,           :string, size: 25
      add :m4_name,           :string, size: 25
      add :m4_description,    :text
      add :m4_time,           :string, size: 25
      add :m5_name,           :string, size: 25
      add :m5_description,    :text
      add :m5_time,           :string, size: 25
      add :m6_name,           :string, size: 25
      add :m6_description,    :text
      add :m6_time,           :string, size: 25
      add :m7_name,           :string, size: 25
      add :m7_description,    :text
      add :m7_time,           :string, size: 25
      add :user_id,           references(:users)
      timestamps()
    end

    create table(:changes) do
      add :date,              :date
      add :weight,            :integer
      add :metabolic_age,     :integer
      add :fat,               :integer
      add :visceral_fat,      :integer
      add :labs,              :text
      add :others,            :text
      add :user_id,           references(:users)
      timestamps()
    end

  end
end
