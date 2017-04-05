#pragma strict

var onMaterial : Material;

function OnCollisionEnter(hitInfo:Collision)
{
	if(hitInfo.gameObject.tag=="Lander")
	{
		renderer.material = onMaterial;
	}
}