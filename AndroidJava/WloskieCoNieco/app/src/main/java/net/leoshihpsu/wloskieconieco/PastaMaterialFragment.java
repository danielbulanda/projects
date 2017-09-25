package net.leoshihpsu.wloskieconieco;


import android.os.Bundle;
import android.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


/**
 * A simple {@link Fragment} subclass.
 */
public class PastaMaterialFragment extends Fragment {


    public PastaMaterialFragment() {
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        RecyclerView recyclerView = (RecyclerView) inflater.inflate(R.layout.fragment_pasta_material, container, false);

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
        RecyclerView.LayoutManager layoutManager = new GridLayoutManager(getActivity(), 2);
        recyclerView.setLayoutManager(layoutManager);

        return recyclerView;
    }

}
