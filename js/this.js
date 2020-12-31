var o = {
    a: () => {
        const obj = {
            fn: () => {
                console.log(this);
            }
        }

        function fn() {
            console.log(this)
            var a = obj.fn
            a();
        }

        fn.call({ b: 1 })
    }
}
o.a();