package net.leoshihpsu.trainer;

import android.os.Bundle;
import android.os.Handler;
import android.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

public class StopwatchFragment extends Fragment implements View.OnClickListener {

    private boolean running = false;
    private  boolean wasRunning = false;
    private int seconds = 0;


    public StopwatchFragment() {
    }


    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

        if(savedInstanceState != null){
            seconds = savedInstanceState.getInt("seconds");
            running = savedInstanceState.getBoolean("running");
            wasRunning = savedInstanceState.getBoolean("wasRunning");
            if(wasRunning == true){
                running = true;
            }
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_stopwatch, container, false);
        runTimer(view);
        Button startButton = (Button) view.findViewById(R.id.start_button);
        Button stopButton = (Button) view.findViewById(R.id.stop_button);
        Button resetButton = (Button) view.findViewById(R.id.reset_button);
        startButton.setOnClickListener(this);
        stopButton.setOnClickListener(this);
        resetButton.setOnClickListener(this);
        return view;
    }

    @Override
    public void onSaveInstanceState(Bundle savedInstanceState){
        savedInstanceState.putInt("seconds", seconds);
        savedInstanceState.putBoolean("running", running);
        savedInstanceState.putBoolean("wasRunning", wasRunning);
    }

    @Override
    public void onPause(){
        super.onPause();
        wasRunning = running;
        running = false;
    }

    @Override
    public void onResume(){
        super.onResume();
        if(wasRunning){
            running = true;
        }
    }

    public void onStartClick(){
        running = true;
    }
    public void onStopClick(){
        running = false;
    }
    public void onResetClick(){
        running = false;
        seconds = 0;
    }

    private void runTimer(View view){
        final TextView textView = (TextView) view.findViewById(R.id.time_view);
        final Handler handler = new Handler();
        handler.post(
                new Runnable() {
                    @Override
                    public void run() {
                        int hours = seconds / 3600;
                        int minutes = (seconds % 3600) / 60;
                        int secs = seconds % 60;
                        String time = String.format("%d:%02d:%02d", hours, minutes, secs);
                        textView.setText(time);
                        if(running){
                            seconds++;
                        }
                        handler.postDelayed(this, 1000);
                    }
                }
        );
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.start_button: onStartClick(); break;
            case R.id.stop_button: onStopClick(); break;
            case R.id.reset_button: onResetClick(); break;
        }
    }
}
