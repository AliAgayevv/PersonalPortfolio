export default interface ServiceInterface {
  serviceName: string;
  _id: string;
  title: string;
  description: string;
  techStack: [
    {
      _id: string;
      name: string;
    }
  ];
}
