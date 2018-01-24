const obj = {
  address:
    Math.random() < 0.5
      ? null
      : {
          street:
            Math.random() < 0.5
              ? null
              : {
                  num: Math.random() < 0.5 ? null : '17'
                }
        }
};

console.log(obj.address.street.num);
