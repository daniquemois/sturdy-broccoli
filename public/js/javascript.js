const range_input = $('.slider');
const indicator = $('.prijs');

range_input.on('change', () => {
  const value = range_input.val();
indicator.html(value);
});

function drag() {
  range_input.on("mousedown", () =>  {
    range_input.on("mousemove", () =>  {
      const value = range_input.val();
      indicator.html(value);
    });
  });
};

drag();

