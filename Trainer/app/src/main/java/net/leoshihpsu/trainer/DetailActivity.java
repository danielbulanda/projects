package net.leoshihpsu.trainer;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class DetailActivity extends AppCompatActivity {

    public static final String EXTRA_WORKOUTNO = "id";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);
        int id = (int) getIntent().getExtras().get(EXTRA_WORKOUTNO);
        WorkoutDetailFragment workoutDetailFragment = (WorkoutDetailFragment) getFragmentManager().findFragmentById(R.id.detail_fragment);
        workoutDetailFragment.setWorkoutId(id);
    }
}
