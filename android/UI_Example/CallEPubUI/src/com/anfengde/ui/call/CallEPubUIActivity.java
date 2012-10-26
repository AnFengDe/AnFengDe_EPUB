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
       bookView.setPath(Constants.CACHE_PAHT, "/mnt/sdcard/epubtest/siddhartha3.epub");
       bookView.initBook();
       bookView.openBook();
    } 
}