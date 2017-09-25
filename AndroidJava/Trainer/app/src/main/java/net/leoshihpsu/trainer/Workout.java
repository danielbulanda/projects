package net.leoshihpsu.trainer;

public class Workout {

    private String name;
    private String description;

    public static final Workout[] workouts = {
            new Workout("Pompki", "10 pompek\n10 pompek\n10 pompek\n"),
            new Workout("Brzuszki", "10 brzuszków\n10 pompek\n10 pompek\n"),
            new Workout("Dla lenia", "10 leni\n10 pompek\n10 pompek\n"),
            new Workout("Masakra", "10 masakr\n10 pompek\n10 pompek\n"),
    };

    public Workout(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return name ;
    }
}
