package net.leoshihpsu.wloskieconieco;



public class Pizza {
    private String name;
    private int imageResource;

    public static final Pizza[] pizzas = {new Pizza("Diavolo", R.drawable.diavolo),
                                          new Pizza("Funghi", R.drawable.funghi)};

    public Pizza(String name, int imageResource) {
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
