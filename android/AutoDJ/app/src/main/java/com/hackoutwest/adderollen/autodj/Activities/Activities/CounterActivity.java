package com.hackoutwest.adderollen.autodj.Activities.Activities;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

import com.hackoutwest.adderollen.autodj.Activities.AsyncTasks.AsyncSendClick;
import com.hackoutwest.adderollen.autodj.Activities.Constants;
import com.hackoutwest.adderollen.autodj.R;

import java.util.HashMap;
import java.util.Map;

import butterknife.Bind;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class CounterActivity extends AppCompatActivity {

    private static final String TAG = "CounterActivity";

    @Bind(R.id.gender_radiogroup)
    RadioGroup genderRadioGroup;

    @Bind(R.id.male_radiobutton)
    RadioButton maleRadioButton;

    @Bind(R.id.female_radiobutton)
    RadioButton femaleRadioButton;

    @Bind(R.id.age_radiogroup)
    RadioGroup ageRadioGroup;

    @Bind(R.id.age_1_radiobutton)
    RadioButton ageOneRadioButton;

    @Bind(R.id.age_2_radiobutton)
    RadioButton ageTwoRadioButton;

    @Bind(R.id.age_3_radiobutton)
    RadioButton ageThreeRadioButton;

    @Bind(R.id.age_4_radiobutton)
    RadioButton ageFourRadioButton;

    @Bind(R.id.inc_button)
    Button incButton;

    @Bind(R.id.dec_button)
    Button decButton;

    @Bind(R.id.current_guest_amount_textview)
    TextView currentGuestAmountTextview;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_counter);
        ButterKnife.bind(this);

        int currentGuestNumber = Integer.parseInt(currentGuestAmountTextview.getText().toString());
        if (currentGuestNumber == 0) {
            decButton.setEnabled(false);
        }

    }

    @OnClick(R.id.inc_button)
    public void incClick() {
        sendClick(Constants.INC);
    }

    @OnClick(R.id.dec_button)
    public void decClick() {
        sendClick(Constants.DEC);
    }


    private void updateGuestNumber(int value) {
        int currentGuestNumber = Integer.parseInt(currentGuestAmountTextview.getText().toString());
        switch (value) {
            case Constants.INC:
                currentGuestNumber++;
                if (currentGuestNumber > 0) {
                    decButton.setEnabled(true);
                }
                break;
            case Constants.DEC:
                currentGuestNumber--;
                if (currentGuestNumber == 0) {
                    decButton.setEnabled(false);
                }
                break;
            default:
                Log.e(TAG, "Invalid click value0");
                break;
        }
        currentGuestAmountTextview.setText(String.valueOf(currentGuestNumber));
    }

    private void sendClick(int value) {
        updateGuestNumber(value);
        int genderRadioButtonId = genderRadioGroup.getCheckedRadioButtonId();
        int ageRadioButtonId = ageRadioGroup.getCheckedRadioButtonId();
        String ageGroup;
        String gender = "";
        String incDec;

        switch (ageRadioButtonId) {
            case Constants.AGE_GROUP_1:
                ageGroup = Constants.AGE_GROUP_1_STRING;
                break;
            case Constants.AGE_GROUP_2:
                ageGroup = Constants.AGE_GROUP_2_STRING;
                break;
            case Constants.AGE_GROUP_3:
                ageGroup = Constants.AGE_GROUP_3_STRING;
                break;
            case Constants.AGE_GROUP_4:
                ageGroup = Constants.AGE_GROUP_4_STRING;
                break;
            case Constants.AGE_GROUP_5:
                ageGroup = Constants.AGE_GROUP_5_STRING;
                break;
            default:
                ageGroup = "Invalid age group";

        }

        switch (genderRadioButtonId) {
            case Constants.GENDER_MALE:
                gender = Constants.GENDER_MALE_STRING;
                break;
            case Constants.GENDER_FEMALE:
                gender = Constants.GENDER_FEMALE_STRING;
                break;
            default:
                gender = "Invalid gender";
        }

        switch (value) {
            case Constants.INC:
                incDec = Constants.INC_STRING;
                break;
            case Constants.DEC:
                incDec = Constants.DEC_STRING;
                break;
            default:
                incDec = "Invalid value";
        }

        Map<String, String> parameters = new HashMap<>(3);

        parameters.put(Constants.AGE, ageGroup);
        parameters.put(Constants.GENDER, gender);
        parameters.put(Constants.VALUE, incDec);

        //new AsyncSendClick(this).execute(parameters);

    }


}
