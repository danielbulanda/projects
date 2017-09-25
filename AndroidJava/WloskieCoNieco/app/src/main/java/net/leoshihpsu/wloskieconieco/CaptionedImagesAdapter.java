package net.leoshihpsu.wloskieconieco;

import android.graphics.drawable.Drawable;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;


public class CaptionedImagesAdapter extends RecyclerView.Adapter<CaptionedImagesAdapter.ViewHolder>{
    private String[] captions;
    private  int[] imageIDs;
    private Listener listener;


    public CaptionedImagesAdapter(String[] captions, int[] imageIDs) {
        this.captions = captions;
        this.imageIDs = imageIDs;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder{
        CardView cardView;
        ViewHolder(CardView cardView){
            super(cardView);
            this.cardView = cardView;
        }
    }
    @Override
    public CaptionedImagesAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType){
        CardView cardView = (CardView) LayoutInflater.from(parent.getContext()).
                inflate(R.layout.card_captioned_image, parent, false);
        return new ViewHolder(cardView);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, final int position){
        CardView cardView  = viewHolder.cardView;
        ImageView imageView = (ImageView) cardView.findViewById(R.id.cardImage);
        Drawable drawable = cardView.getResources().getDrawable(imageIDs[position]);
        imageView.setImageDrawable(drawable);
        imageView.setContentDescription(captions[position]);
        TextView textView = (TextView) cardView.findViewById(R.id.cardText);
        textView.setText(captions[position]);
        cardView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(listener != null){
                    listener.onClick(position);
                }
            }
        });
    }

    @Override
    public int getItemCount(){
        return captions.length;
    }

    public void setListener(Listener listener){
        this.listener = listener;
    }

    public static interface Listener{
        public void onClick(int position);
    }
}
