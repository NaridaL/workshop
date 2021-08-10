float sdOctahedron(float s, vec3 p) {
    p = abs(p);
    float m = p.x + p.y + p.z - s;
    vec3 q;
    if (3.0 * p.x < m) q = p.xyz;
    else if (3.0 * p.y < m) q = p.yzx;
    else if (3.0 * p.z < m) q = p.zxy;
    else return m * 0.57735027;

    float k = clamp(0.5 * (q.z - q.y + s), 0.0, s);
    return length(vec3(q.x, q.y - s + k, q.z - k));
}
#pragma glslify: export(sdOctahedron)

float sdOctahedron(vec3 p, float s)
{
    p = abs(p);

    float m = p.x + p.y + p.z - s;
    //find point on octohedron surf nearest to p
    vec3 projPoint = p - vec3(0.333333*m);		//project onto surface plane
    //now push projected point, if outside triangle edge, perpendicular to edge, to edge
    vec3 toMove = min(projPoint,0.0);			//if projpoint.x<0 move along (1.0,-0.5,-0.5) , etc
    float toMoveSum = dot(toMove, vec3(1.0));	//which is basically along (1.5,0,0) then vec3(-0.5)

    vec3 movedPoint = projPoint + toMove*vec3(-1.5) + toMoveSum*vec3(0.5);	//better to multiply toMove by a matrix (1s diagonal, 0.5 other)?

    movedPoint = max(movedPoint, 0.0);			//cap x,y,z to 0 then
    movedPoint*= s/dot(movedPoint,vec3(1.0));	//scale about 0,0,0

    return length(p-movedPoint);
}