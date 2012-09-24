package com.anfengde.ui.call;


import com.anfengde.epub.core.value.Constants;
import com.anfengde.epub.ui.BookView;
import android.app.Activity;
import android.os.Bundle;
import android.view.WindowManager;

public class CallEPubUIActivity extends Activity {
	public BookView bookView;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
        		WindowManager.LayoutParams.FLAG_FULLSCREEN); 
       bookView = (BookView) findViewById(R.id.bookView1);
       bookView.setPath(Constants.CACHE_PAHT, "/mnt/sdcard/epub/testBook.epub");
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