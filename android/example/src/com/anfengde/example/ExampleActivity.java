package com.anfengde.example;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Timer;
import java.util.TimerTask;

import com.anfengde.example.R;
import com.anfengde.epub.EPub_chapter;
import com.anfengde.epub.EPub_metadata;
import com.anfengde.epub.EpubJNI;

import android.app.Activity;
import android.content.Intent;
import android.content.res.AssetManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.TextView;

public class ExampleActivity extends Activity {
	private EpubJNI  clsEpub;
	private LinearLayout linearlayout;
	private Button buttonEPubInit;
	private Button buttonEPubOpen;
	private Button buttonClose;
	private Button buttonEPubGetMetadata;
	private Button buttonEPubGetRoot;	
	private Button buttonEPubGetChapterCount;
	private Button buttonEPubGetChapter;
	private Button buttonEPubCleanCache;
	private Button buttonCleanup;
	private ImageButton imageButtonLink; 
	private TextView tv;
	private String bookPath;
	private Timer mTimer ;
    private TimerTask mTimerTask;
    private Handler mHandler;
    private int flag = 1;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        this.initBook();
        this.initAdvTimer();
		this.init();
		this.initListener();
    }
    public void initAdvTimer()
    {
    	mTimer = new Timer();
    	mHandler = new Handler(){
            @Override
            public void handleMessage(Message msg) {
                switch (msg.what){
                case 0:
                	imageButtonLink.setBackgroundResource(R.drawable.ad1);
                    break;
                case 1:
                	imageButtonLink.setBackgroundResource(R.drawable.ad2);
                	break;
                default:
                	break;
                }
                linearlayout.invalidate();
                super.handleMessage(msg);
            }
        };
        
        mTimerTask = new TimerTask() {
            @Override
            public void run() {
                Log.d("AndroidTimerDemo", "timer");
                mHandler.sendEmptyMessage(flag%2);
                flag = flag%2 +1;
                }
        };

        mTimer.schedule(mTimerTask, 5000, 5000);
    }       
    
	public void initBook()
    {
		//set  sample epub book path
		bookPath = "/mnt/sdcard/epub/testBook.epub";
		
		//create epub directory
		File f1 = new File("/mnt/sdcard/epub");
		if (!f1.exists()) {
			f1.mkdir();
		}
		
    	File f = new File(bookPath);
    	if (!f.exists())
    	try 
    	{
    		f.createNewFile();
    	    InputStream is = getAssets().open("testBook.epub");
    	    int size = is.available();
    	    byte[] buffer = new byte[size];
    	    is.read(buffer);
    	    is.close();
    	    
    	    FileOutputStream fos = new FileOutputStream(f);
    	    fos.write(buffer);
    	    fos.close();
    	} 
    	catch (Exception e) 
    	{ 
    		throw new RuntimeException(e); 
    	}
    	
    }
	public void init() {
		//call EPUB jni 
		clsEpub = new EpubJNI();
		tv=(TextView)findViewById(R.id.editTestLog);
		linearlayout = (LinearLayout)findViewById(R.id.linearLayout);
        buttonEPubInit=(Button)findViewById(R.id.buttonEPubInit);
        buttonEPubOpen=(Button)findViewById(R.id.buttonEPubOpen);
        buttonClose = (Button)findViewById(R.id.buttonEPubClose);
        buttonEPubGetMetadata = (Button)findViewById(R.id.buttonEPubGetMetadata);
        buttonEPubGetRoot = (Button)findViewById(R.id.buttonEPubGetDocRoot);
        buttonEPubGetChapterCount = (Button)findViewById(R.id.buttonEPubGetChapterCount);
        buttonEPubGetChapter=(Button)findViewById(R.id.buttonEPubGetChapter);
        buttonEPubCleanCache = (Button)findViewById(R.id.buttonEPubCleanCache);
        buttonCleanup = (Button)findViewById(R.id.buttonEPubCleanup);
        imageButtonLink = (ImageButton)findViewById(R.id.imageButtonLink);
	}
	
	public void initListener()
	{
        buttonEPubInit.setOnClickListener(new Button.OnClickListener(){
        	public void onClick(View v){
        		String cachePath = new String("/mnt/sdcard/epub");
        		int init_ret = clsEpub.initEpubEnv(cachePath);
                tv.setText("epubInit return value ="+String.valueOf(init_ret));
        	}
        });
        
        buttonEPubOpen.setOnClickListener(new Button.OnClickListener(){
        	public void onClick(View v){
        		int handle = clsEpub.openEpubBook(bookPath);
                tv.setText("epubOpen return value ="+String.valueOf(handle));
        	}
        }); 

        buttonClose.setOnClickListener(new Button.OnClickListener(){
        	public void onClick(View v){
        		int handle = clsEpub.openEpubBook(bookPath);
        		int ret = clsEpub.closeEpubBook(handle);
        		tv.setText("epubClose return value ="+String.valueOf(ret));
        	}
        }); 

        buttonEPubGetMetadata.setOnClickListener(new Button.OnClickListener(){
        	public void onClick(View v){
        		int handle = clsEpub.openEpubBook(bookPath);
        		EPub_metadata metadata = new EPub_metadata();
        		int ret= clsEpub.getEpubMetadata(metadata, handle);
        		tv.setText("epubGetMetadata return value ="+String.valueOf(ret));
        	}
        }); 

        buttonEPubGetRoot.setOnClickListener(new Button.OnClickListener(){
        	public void onClick(View v){
        		int handle = clsEpub.openEpubBook(bookPath);
        		String bookRootDir = clsEpub.getEpubBookRootFolder(handle);
        		tv.setText("bookRootDir = "+ bookRootDir);
        	}
        });         
        
        buttonEPubGetChapterCount.setOnClickListener(new Button.OnClickListener(){
        	public void onClick(View v){
        		int handle = clsEpub.openEpubBook(bookPath);
        		//get the chapter number
        		int chapterNumber = clsEpub.getEpubChapterCount(handle);
        		tv.setText("chapterNumber = "+String.valueOf(chapterNumber));
        	}
        });         
        
        buttonEPubGetChapter.setOnClickListener(new Button.OnClickListener(){
        	public void onClick(View v){
        		String titleList = "";
        		int handle = clsEpub.openEpubBook(bookPath);
        		//get the chapter number
        		int chapterNumber = clsEpub.getEpubChapterCount(handle);
        		if (chapterNumber > 0)
        		{
            		EPub_chapter[] chapterArray = new EPub_chapter[chapterNumber];
            		int i, current_handle = handle;
            		for (i = 0; i < chapterNumber; i++)
            		{
            			chapterArray[i] = new EPub_chapter();
            			int next_handle = clsEpub.getEpubChapter(chapterArray[i], current_handle, i);
            			current_handle = next_handle;
            			titleList = titleList + chapterArray[i].title + "\n";
            		}
            		tv.setText(titleList);
        		}
        		else 
                    tv.setText("chapterNumber = "+String.valueOf(chapterNumber));
        	}
        }); 
 
        buttonEPubCleanCache.setOnClickListener(new Button.OnClickListener(){
        	public void onClick(View v){
        		int handle = clsEpub.openEpubBook(bookPath);
        		int ret = clsEpub.cleanEpubBookCache(handle);
        		tv.setText("epubCleanCache return value = "+String.valueOf(ret));        		
        	}
        });        
        
        buttonCleanup.setOnClickListener(new Button.OnClickListener(){
        	public void onClick(View v){
        		clsEpub.cleanUpEpubEnv();
        		tv.setText("clean up");        		
        	}
        });

        imageButtonLink.setOnClickListener(new Button.OnClickListener(){
        	public void onClick(View v){
        		String url = "http://epub.anfengde.com";
        		tv.setText("go to "+url);       
        		Intent intent = new Intent(Intent.ACTION_VIEW);

        		intent .setData(Uri.parse(url));
        		startActivity(intent);

        	}
        });        
	}
	
	@Override  
    protected void onDestroy()  
    {  
        // TODO Auto-generated method stub  
		mTimer.cancel();  
        super.onDestroy();  
    } 
}