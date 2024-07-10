package com.mycompany.myapp;
	import android.app.Fragment;
	import android.view.View;
	import android.os.*;
	import android.view.LayoutInflater;
	import android.view.ViewGroup;

	public class fragment2 extends Fragment{
		View View;

		@Override
		public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
		{
			View = inflater.inflate(R.layout.fragment2,container,false);
			return View;
		}


	}




