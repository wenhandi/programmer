var minCostConnectPoints = function(points) {
    const dist = (x, y) => {
        return Math.abs(points[x][0] - points[y][0]) + Math.abs(points[x][1] - points[y][1]);
    }

    const n = points.length;
    const dsu = new DisjointSetUnion(n);
    const edges = [];

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            edges.push([dist(i, j), i, j]);
        }
    }
    edges.sort((a, b) => a[0] - b[0]);

    let ret = 0, num = 1;
    for (const [length, x, y] of edges) {
        if (dsu.unionSet(x, y)) {
            ret += length;
            num += 1;
            if (num === n) {
                break;
            }
        }
    }
    return ret;
};

class DisjointSetUnion {
    constructor (n) {
        this.n = n;
        // 1填充数组
        this.rank = new Array(n).fill(1);
        // 索引填充数组
        this.f = new Array(n).fill(0).map((element, index) => index);
    }

    find (x) {
        // 索引数组键值对应  返回参数
        if (this.f[x] === x) {
            return x;
        }
        // 用值找
        this.f[x] = this.find(this.f[x]);
        return this.f[x];
    }

    unionSet (x, y) {
        let fx = this.find(x), fy = this.find(y);
        if (fx === fy) {
            return false;
        }

        if (this.rank[fx] < this.rank[fy]) {
            [fx, fy] = [fy, fx];
        }
        this.rank[fx] += this.rank[fy];
        this.f[fy] = fx;
        return true;
    }
}