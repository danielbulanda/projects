package net.leoshihpsu.wloskieconieco;

import android.content.Intent;
import android.os.Bundle;
import android.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

public class PizzaMaterialFragment extends Fragment {


    public PizzaMaterialFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(final LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        RecyclerView recyclerView = (RecyclerView) inflater.inflate(R.layout.fragment_pizza_material, container, false);

        String[] captions = new String[Pizza.pizzas.length];
        for(int i = 0; i < Pizza.pizzas.length; i++){
            captions[i] = Pizza.pizzas[i].getName();
        }
        int[] imageIDs = new int[Pizza.pizzas.length];
        for(int i = 0; i < Pizza.pizzas.length; i++){
            imageIDs[i] = Pizza.pizzas[i].getImageResource();
        }
        CaptionedImagesAdapter captionedImagesAdapter = new CaptionedImagesAdapter(captions, imageIDs);
        recyclerView.setAdapter(captionedImagesAdapter);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(getActivity());
        recyclerView.setLayoutManager(layoutManager);

        captionedImagesAdapter.setListener(new CaptionedImagesAdapter.Listener() {
            @Override
            public void onClick(int position) {
                Intent intent = new Intent(getActivity(), PizzaDetailActivity.class);
                intent.putExtra(PizzaDetailActivity.PIZZANO, position);
                getActivity().startActivity(intent);
            }
        });
        return  recyclerView;
    }

}
