package net.leoshihpsu.wloskieconieco;



public class Pasta {
    private String name;
    private int imageResource;

    public static final Pasta[] pastas = {new Pasta("Pasta1", R.drawable.diavolo),
            new Pasta("Pasta2", R.drawable.funghi)};

    public Pasta(String name, int imageResource) {
        this.name = name;
        this.imageResource = imageResource;
    }

    public String getName() {
        return name;
    }

    public int getImageResource() {
        return imageResource;
    }
}
