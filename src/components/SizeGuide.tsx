import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SizeGuide = () => {
  const sizeChart = [
    { us: '3', uk: 'F', eu: '44', diameter: '14.1' },
    { us: '4', uk: 'H', eu: '47', diameter: '14.9' },
    { us: '5', uk: 'J', eu: '49', diameter: '15.7' },
    { us: '6', uk: 'L', eu: '51', diameter: '16.5' },
    { us: '7', uk: 'N', eu: '54', diameter: '17.3' },
    { us: '8', uk: 'P', eu: '57', diameter: '18.1' },
    { us: '9', uk: 'R', eu: '59', diameter: '18.9' },
    { us: '10', uk: 'T', eu: '61', diameter: '19.8' },
    { us: '11', uk: 'V', eu: '63', diameter: '20.6' },
    { us: '12', uk: 'X', eu: '65', diameter: '21.4' },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">International Size Guide</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Ring Care Tips</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>Clean your rings regularly with mild soap and water</li>
          <li>Remove rings during physical activities or when using harsh chemicals</li>
          <li>Store rings separately to prevent scratching</li>
          <li>Have your rings professionally cleaned and checked annually</li>
        </ul>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>US Size</TableHead>
            <TableHead>UK Size</TableHead>
            <TableHead>EU Size</TableHead>
            <TableHead>Diameter (mm)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sizeChart.map((size) => (
            <TableRow key={size.us}>
              <TableCell>{size.us}</TableCell>
              <TableCell>{size.uk}</TableCell>
              <TableCell>{size.eu}</TableCell>
              <TableCell>{size.diameter}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default SizeGuide;