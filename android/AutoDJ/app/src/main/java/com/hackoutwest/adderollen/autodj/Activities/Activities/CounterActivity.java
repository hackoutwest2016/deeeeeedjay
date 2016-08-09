package com.hackoutwest.adderollen.autodj.Activities.Activities;

import android.graphics.drawable.Drawable;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.TextView;

import com.hackoutwest.adderollen.autodj.Activities.Constants;
import com.hackoutwest.adderollen.autodj.R;

import java.util.HashMap;
import java.util.Map;

import butterknife.Bind;
import butterknife.ButterKnife;
import butterknife.OnCheckedChanged;
import butterknife.OnClick;

public class CounterActivity extends AppCompatActivity {

    private static final String TAG = "CounterActivity";

    @Bind(R.id.gender_container)
    LinearLayout genderContainer;

    @Bind(R.id.gender_male_button)
    ImageButton maleButton;

    @Bind(R.id.gender_female_button)
    ImageButton femaleButton;

    @Bind(R.id.age_1_checkbox)
    CheckBox ageOneCheckbox;

    @Bind(R.id.age_2_checkbox)
    CheckBox ageTwoCheckbox;

    @Bind(R.id.age_3_checkbox)
    CheckBox ageThreeCheckbox;

    @Bind(R.id.age_4_checkbox)
    CheckBox ageFourCheckbox;

    @Bind(R.id.age_5_checkbox)
    CheckBox ageFiveCheckbox;

    @Bind(R.id.inc_button)
    Button incButton;

    @Bind(R.id.dec_button)
    Button decButton;

    @Bind(R.id.current_guest_amount_textview)
    TextView currentGuestAmountTextview;

    private boolean isMale = true;
    private CheckBox[] checkBoxes;
    private boolean maleIsActive;
    private boolean femaleIsActive;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_counter);
        ButterKnife.bind(this);

        int currentGuestNumber = Integer.parseInt(currentGuestAmountTextview.getText().toString());
        if (currentGuestNumber == 0) {
            decButton.setEnabled(false);
        }

        maleIsActive = true;

        checkBoxes = new CheckBox[5];
        checkBoxes[0] = ageOneCheckbox;
        checkBoxes[1] = ageTwoCheckbox;
        checkBoxes[2] = ageThreeCheckbox;
        checkBoxes[3] = ageFourCheckbox;
        checkBoxes[4] = ageFiveCheckbox;

    }

    @OnClick(R.id.inc_button)
    public void incClick() {
        sendClick(Constants.INC);
    }

    @OnClick(R.id.dec_button)
    public void decClick() {
        sendClick(Constants.DEC);
    }


    @OnClick(R.id.gender_male_button)
    public void maleClick() {
        if (!maleIsActive) {
            Drawable genderDrawable = getDrawable(R.drawable.sel_radiobutton_male) ;

            maleIsActive = true;
            femaleIsActive = false;
            femaleButton.setBackgroundColor(ContextCompat.getColor(this,R.color.white));
            maleButton.setBackgroundColor(ContextCompat.getColor(this,R.color.male));

            for (int i = 0; i < checkBoxes.length; i++) {
                if (checkBoxes[i].isChecked()) {
                    checkBoxes[i].setBackground(genderDrawable);
                }
            }
        }


    }

    @OnClick(R.id.gender_female_button)
    public void femaleClick() {
        if (!femaleIsActive) {
            Drawable genderDrawable = getDrawable(R.drawable.sel_radiobutton_female);

            femaleIsActive = true;
            maleIsActive = false;
            femaleButton.setBackgroundColor(ContextCompat.getColor(this,R.color.female));
            maleButton.setBackgroundColor(ContextCompat.getColor(this,R.color.white));

            for (int i = 0; i < checkBoxes.length; i++) {
                if (checkBoxes[i].isChecked()) {
                    checkBoxes[i].setBackground(genderDrawable);
                }
            }
        }


    }

    private int checkedBox;

    @OnCheckedChanged({R.id.age_1_checkbox, R.id.age_2_checkbox, R.id.age_3_checkbox, R.id.age_4_checkbox, R.id.age_5_checkbox})
    public void checkboxCheckedChanged(CheckBox checkBox, boolean isChecked) {
        if (isChecked) {
            checkedBox = checkBox.getId();
            Drawable genderDrawable = isMale ? getDrawable(R.drawable.sel_radiobutton_male) : getDrawable(R.drawable.sel_radiobutton_female);
            checkBox.setBackground(genderDrawable);

            for (int i = 0; i < checkBoxes.length; i++) {
                if (checkBoxes[i].getId() != checkBox.getId()) {
                    checkBoxes[i].setChecked(false);
                }
            }

        } else {
            Log.d(TAG,"asdf");
            if (checkBox.getId() == checkedBox) {
                checkBox.setChecked(true);
            }
        }
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
        int genderRadioButtonId = getCheckedGenderId();
        int ageCheckboxId = getCheckedCheckboxId();
        String gender;
        String ageGroup;
        String incDec;

        switch (ageCheckboxId) {
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

        Log.d(TAG, "AGE: " + ageGroup);
        Log.d(TAG, "GENDER: " + gender);
        Log.d(TAG, "VALUE: " + incDec);

        //new AsyncSendClick(this).execute(parameters);

    }

    private int getCheckedGenderId() {
        if (maleIsActive) {
            return R.id.gender_male_button;
        } else {
            return R.id.gender_female_button;
        }
    }

    private int getCheckedCheckboxId() {
        for (int i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i].isChecked()) {
                return checkBoxes[i].getId();
            }
        }
        return -1;
    }


}
