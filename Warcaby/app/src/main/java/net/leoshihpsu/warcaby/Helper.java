package net.leoshihpsu.warcaby;

import android.content.Context;
import android.graphics.Color;
import android.util.TypedValue;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.GridLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

public class Helper {
    private Context context;
    private LinearLayout layout;
    private GridLayout gridLayout;
    private Game game;
    private Button[][] tableView;
    private int[][] table;
    private boolean oneSelected;
    private boolean bothSelected;
    private int[] selected;
    private int[] target;
    private Listener listener;

    public Helper(Context context, LinearLayout layout, Game game) {
        this.context = context;
        this.layout = layout;
        this.game = game;
        listener = new Listener();
        gridLayout = (GridLayout) layout.findViewById(R.id.gridLayout);
        table = game.create();
        tableView = createView();
        oneSelected = false;
        bothSelected = false;
        selected = new int[] {0,0};
        target = new int[] {0,0};
    }

    public void draw(){

    }

    public Button[][] createView() {
        Button[][] tableView = new Button[8][8];
        for (int i = 0; i < 64; i++) {
            tableView[i / 8][i % 8] = new Button(context);
            tableView[i / 8][i % 8].setId(i);
            gridLayout.addView(tableView[i / 8][i % 8]);
            tableView[i / 8][i % 8].setTextSize(TypedValue.COMPLEX_UNIT_SP, 35);
            tableView[i / 8][i % 8].setPadding(25, 0, 25, 0);
            tableView[i / 8][i % 8].getLayoutParams().height = ViewGroup.LayoutParams.WRAP_CONTENT;
            tableView[i / 8][i % 8].getLayoutParams().width = ViewGroup.LayoutParams.WRAP_CONTENT;

            if ((i / 8) % 2 == 0) {
                if (i % 2 == 0) {
                    tableView[i / 8][i % 8].setBackgroundColor(context.getResources().getColor(R.color.colorPrimary));
                } else {
                    tableView[i / 8][i % 8].setBackgroundColor(context.getResources().getColor(R.color.colorPrimaryDark));
                }
            } else {
                if (i % 2 == 0) {

                    tableView[i / 8][i % 8].setBackgroundColor(context.getResources().getColor(R.color.colorPrimaryDark));
                } else {
                    tableView[i / 8][i % 8].setBackgroundColor(context.getResources().getColor(R.color.colorPrimary));
                }
            }
            if (table[i / 8][i % 8] == Game.WHITE) {
                tableView[i / 8][i % 8].setTextColor(Color.parseColor("#ffffff"));
                tableView[i / 8][i % 8].setText(String.valueOf(new Character((char) 9679)));
            } else if (table[i / 8][i % 8] == Game.BLACK) {
                tableView[i / 8][i % 8].setTextColor(Color.parseColor("#000000"));
                tableView[i / 8][i % 8].setText(String.valueOf(new Character((char) 9679)));
            } else {
                tableView[i / 8][i % 8].setTextColor(Color.parseColor("#00000000"));
                tableView[i / 8][i % 8].setText(String.valueOf(new Character((char) 9679)));
            }
            tableView[i / 8][i % 8].setOnClickListener(listener);
        }
        return tableView;
    }

    class Listener implements View.OnClickListener {
        @Override
        public void onClick(View v) {
            select(v);
            if(bothSelected){
                game.move(selected, target);
                updateView();
            }
        }
    }

    private void select(View v){
        if (!oneSelected) {
            selected[0] = v.getId() / 8;
            selected[1] = v.getId() % 8;
            if ((table[selected[0]][selected[1]] == Game.WHITE) && (game.getTurn()== Game.WHITE)) {
                tableView[selected[0]][selected[1]].setTextColor(Color.parseColor("#008800"));
                oneSelected = true;
                bothSelected = false;
            } else if ((table[selected[0]][selected[1]] == Game.BLACK) && (game.getTurn()== Game.BLACK)) {
                tableView[selected[0]][selected[1]].setTextColor(Color.parseColor("#008800"));
                oneSelected = true;
                bothSelected = false;
            }
        }else if (!bothSelected && oneSelected) {
            target[0] = v.getId() / 8;
            target[1] = v.getId() % 8;
            bothSelected = true;
            oneSelected = false;
            if (table[selected[0]][selected[1]] == Game.WHITE) {
                tableView[selected[0]][selected[1]].setTextColor(Color.parseColor("#ffffff"));
            } else if (table[selected[0]][selected[1]] == Game.BLACK) {
                tableView[selected[0]][selected[1]].setTextColor(Color.parseColor("#000000"));
            }
        }
    }

    private void updateView() {
        for (int i = 0; i < 64; i++) {
            switch(table[i/8][i%8]){
                case Game.WHITE:
                    tableView[i/8][i%8].setTextColor(Color.parseColor("#ffffff"));
                    break;
                case Game.BLACK:
                    tableView[i/8][i%8].setTextColor(Color.parseColor("#000000"));
                    break;
                case Game.NONE:
                    tableView[i/8][i%8].setTextColor(Color.parseColor("#00000000"));
                    break;
            }
        }
        TextView status = (TextView) layout.findViewById(R.id.status);
        TextView moveView = (TextView) layout.findViewById(R.id.move);
        status.setText("Białe: " + game.getWhiteCount() + "   " + "Czarne: " + game.getBlackCount());
        String moveName = game.getTurn()==Game.WHITE ? "gracz biały" : "gracz czarny";
        moveView.setText("Ruch: " + moveName);
    }
}
