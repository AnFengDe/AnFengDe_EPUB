package com.anfengde.ui.call;

import java.text.DateFormat;
import java.util.Calendar;

import com.anfengde.epub.core.value.Constants;
import com.anfengde.epub.ui.BookView;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.WindowManager;

public class CallEPubUIActivity extends Activity {
	public BookView bookView;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        String startTime = DateFormat.getDateTimeInstance().format(Calendar.getInstance().getTime());
//		Log.v("start timing",startTime);
        setContentView(R.layout.main);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
        		WindowManager.LayoutParams.FLAG_FULLSCREEN); 
        //requestWindowFeature(Window.FEATURE_NO_TITLE);
        //getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        //LinearLayout linearLayout1 = (LinearLayout) findViewById(R.id.linearLayout1);
       bookView = (BookView) findViewById(R.id.bookView1);
       bookView.setPath(Constants.CACHE_PAHT, "/mnt/sdcard/epubtest/Creative Commons - A Shared Culture.epub");
       bookView.initBook();
       bookView.openBook();
//       bookView.setBackBtnBackgroundImage(R.drawable.ic_launcher);
//       bookView.setTableContentsBtnBackgroundImage(R.drawable.ic_launcher);
//       bookView.setBookTitleFontColor(Color.BLUE);
//       bookView.setBookTitleFontType(null, Typeface.BOLD_ITALIC);
//       bookView.setBookTitleFontSize(23);
//       bookView.setBookTitleHidden(View.INVISIBLE);
//       bookView.setFontSizeBtnBackgroundImage(R.drawable.ic_launcher);
//       bookView.setTopMenuBackgroundImage(R.drawable.ic_launcher);
//       bookView.setContinueReadingBtnBackgroundImage(R.drawable.ic_launcher);
//       bookView.setChapterTitleFontColor(Color.CYAN);
//       bookView.setChapterTitleFontSize(23);
//       bookView.setChapterTitleFontType(null,Typeface.ITALIC);
//       bookView.setTableContentMenuBackgroundImage(R.drawable.ic_launcher);
//       bookView.setTableContentViewBackgroundImage(R.drawable.ic_launcher);
//       bookView.saveWidgetInfo();
//       bookView.resetWidgetInfo();
    }
}