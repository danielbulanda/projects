package net.leoshihpsu.wloskieconieco;


import android.content.Intent;
import android.os.Bundle;
import android.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;


public class TopFragment extends Fragment {


    public TopFragment() {
    }

    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        RelativeLayout relativeLayout = (RelativeLayout) inflater.inflate(R.layout.fragment_top, container, false);
        RecyclerView recyclerView = (RecyclerView) relativeLayout.findViewById(R.id.welcomeRecycler);

        String[] captions = new String[Pasta.pastas.length];
        for(int i = 0; i < Pasta.pastas.length; i++){
            captions[i] = Pasta.pastas[i].getName();
        }
        int[] imageIDs = new int[Pasta.pastas.length];
        for(int i = 0; i < Pasta.pastas.length; i++){
            imageIDs[i] = Pasta.pastas[i].getImageResource();
        }
        CaptionedImagesAdapter captionedImagesAdapter = new CaptionedImagesAdapter(captions, imageIDs);
        recyclerView.setAdapter(captionedImagesAdapter);
        GridLayoutManager layoutManager = new GridLayoutManager(getActivity(), 2);
        recyclerView.setLayoutManager(layoutManager);
        captionedImagesAdapter.setListener(new CaptionedImagesAdapter.Listener() {
            @Override
            public void onClick(int position) {
                Intent intent = new Intent(getActivity(), PizzaDetailActivity.class);
                intent.putExtra(PizzaDetailActivity.PIZZANO, position);
                getActivity().startActivity(intent);
            }
        });

        return relativeLayout;
    }
}
