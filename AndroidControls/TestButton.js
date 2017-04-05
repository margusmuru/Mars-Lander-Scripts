#pragma strict
static var ShowGUI=false;

function Start () 
{
	ShowGUI=true;
}

function Update () 
{
	if(ShowGUI)
	{
		guiTexture.enabled=true;
	}
	else
	{
		guiTexture.enabled=false;
	}
	if(ShowGUI)
	{
		if(Input.touchCount>0)
		{
			for(var i:int=0;i<Input.touchCount;i++)
			{
				var touch:Touch=Input.GetTouch(i);
				if(touch.phase==TouchPhase.Began && guiTexture.HitTest(touch.position))
				{
					//stuff happens
					print("Touch!");
				}
			}
		}
		else
		{
			//stuff ends
		}
	}
}