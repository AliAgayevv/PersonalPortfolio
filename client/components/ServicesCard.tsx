import AnimationWhenElementOnScreen from "./animations/AnimationWhenElementOnScreen";

const ServicesCard = ({
  title,
  description,
  list,
}: {
  title: string;
  description: string;
  list: [
    {
      name: string;
    }
  ];
}) => {
  return (
    <AnimationWhenElementOnScreen
      animations={{
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        viewport: { once: true, amount: "some" },
      }}
    >
      <div className="flex flex-col border-b border-gray-700 py-4">
        {/* I dont use state for avoid client rendering and less bundle */}
        <details className="group">
          <summary className="flex items-center gap-4 hover:cursor-pointer list-none">
            <h2 className="text-lg font-semibold">{title}</h2>
            {/* TODO: add animation for change + to - or - to + WITHOUT MOTION */}

            <span className="ml-auto text-2xl group-open:hidden transition-all duration-300">
              +
            </span>
            <span className="ml-auto text-2xl hidden group-open:flex transition-all duration-300">
              -
            </span>
          </summary>

          <div className="mt-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <p className="text-gray-300">{description}</p>
                <div>
                  <h4 className="text-white font-semibold mb-2">
                    [ KEY FEATURES ]
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-200">
                    {list.map((item, index) => (
                      <li key={index}>{item.name}</li>
                    ))}
                  </ul>
                </div>
                <button className="bg-white text-black px-4 py-2 mt-2 font-semibold w-fit">
                  BOOK A CALL
                </button>
              </div>
            </div>
          </div>
        </details>
      </div>
    </AnimationWhenElementOnScreen>
  );
};

export default ServicesCard;
