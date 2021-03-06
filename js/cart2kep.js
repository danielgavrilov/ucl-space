function cart2kep({r, v}) {

    const h = cross(r, v);
    const i = get_i(h);
    const Ω = get_Ω(h);
    const a = get_a(r, v, GM);
    const p = pow(norm(h), 2) / GM;
    const e = sqrt(1 - (p/a));
    const n = sqrt(GM / pow(a, 3));
    const E = get_E(r, v, a, n);
    const ν = get_ν(e, E);
    const u = get_u(r, i, Ω);
    const ω = u - ν;

    return {a, e, i, ω, Ω, ν};
}

function get_ν(e, E) {
    return atan2(
      sqrt(1 - pow(e,2)) * sin(E),
      cos(E) - e
    );
}

function get_i(h) {

    const hMag = norm(h);
    const Wx = h[0] / hMag;
    const Wy = h[1] / hMag;
    const Wz = h[2] / hMag;

    return atan2(
      sqrt(pow(Wx, 2) + pow(Wy,2)),
      Wz
    );
}

function get_Ω(h) {
    const hMag = norm(h);
    const Wx = h[0] / hMag;
    const Wy = h[1] / hMag;
    return atan2(Wx, -Wy);
}

function get_a(r, v, GM) {
    const temp = (2 / norm(r)) - (pow(norm(v), 2) / GM);
    if (abs(temp) < 0.000001) {
        console.log("shit");
    }
    return 1 / temp;
}

function get_E(r, v, a, n) {
    return atan2(
      dot(r, v) / (pow(a, 2) * n),
      1 - norm(r) / a
    );
}

function get_u(r, i, Ω) {
    const [x,y,z] = r;
    return atan2(
      z / sin(i),
      x * cos(Ω) + y * sin(Ω)
    );
}
