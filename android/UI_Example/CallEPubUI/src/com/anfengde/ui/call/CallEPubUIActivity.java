package com.anfengde.ui.call;

import com.anfengde.epub.core.value.Constants;
import com.anfengde.epub.ui.BookView;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.view.WindowManager;

@SuppressLint("SdCardPath")
public class CallEPubUIActivity extends Activity {
	//To stop finishing the current activity instance
	private boolean foreground = false;
	
	/** To finished the background instances of the activity **/
	protected BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
		@Override
		public void onReceive(Context context, Intent intent) {
			if (foreground)
				return;
			finish();
		}
	};
	public BookView bookView;

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		foreground = true;
		setContentView(R.layout.main);
		getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
				WindowManager.LayoutParams.FLAG_FULLSCREEN);
		bookView = (BookView) findViewById(R.id.bookView1);
		bookView.setPath(Constants.CACHE_PAHT);
		bookView.initBook();
		bookView.openShelf();
		
		//To check if clicking on the epub file
		Intent intent = getIntent();
		bookView.openBookFromFileExplorer(intent);
	}

	/** To register broadcast */
	@Override
	public void onResume() {
		super.onResume();
		foreground = true;
		IntentFilter filter = new IntentFilter();
		filter.addAction("com.anfengde.ExitApp");
		this.registerReceiver(this.broadcastReceiver, filter);
		finishPreviousActivity();
	}
    
	/** To send broadcast to finish activity */
	protected void finishPreviousActivity() {
		Intent intent = new Intent();
		intent.setAction("com.anfengde.ExitApp");
		this.sendBroadcast(intent);
	}

	@Override
	protected void onPause() {
		super.onPause();
		foreground = false;
	}

	@Override
	protected void onStop() {
		super.onStop();
		foreground = false;
	}
}
