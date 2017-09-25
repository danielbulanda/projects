package net.leoshihpsu.trainer;

import android.app.FragmentTransaction;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.FrameLayout;

public class MainActivity extends AppCompatActivity implements WorkoutListFragment.WorkoutListListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

      /*  WorkoutDetailFragment workoutDetailFragment = (WorkoutDetailFragment)
                getFragmentManager().findFragmentById(R.id.detail_fragment);
        workoutDetailFragment.setWorkoutId(3);*/
    }


    public void itemClicked (long id) {
        FrameLayout frameLayout = (FrameLayout) findViewById(R.id.detail_frame);
        if(frameLayout != null){

            WorkoutDetailFragment workoutDetailFragment = new WorkoutDetailFragment();
            FragmentTransaction transaction = getFragmentManager().beginTransaction();
            workoutDetailFragment.setWorkoutId(id);
            transaction.replace(R.id.detail_frame, workoutDetailFragment);
            transaction.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_FADE);
            transaction.addToBackStack(null);
            transaction.commit();
        } else {
            Intent intent = new Intent(this, DetailActivity.class);
            intent.putExtra(DetailActivity.EXTRA_WORKOUTNO, (int) id);
            startActivity(intent);
        }

    }
}
