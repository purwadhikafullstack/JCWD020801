import {
    Card,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Input,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { UserPlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";

const TABS = [
    {
        label: "Category",
        value: 0,
    },
    {
        label: "Sub category",
        value: 1,
    },
];

export function TableHeader({
    title,
    description,
    showAddButton,
    addButtonText,
    handleOpenAdd = () => { },
    handleReset = () => { },
    searchValue,
    setSearchValue,
    onTabChange }) {

    const adminDataRedux = useSelector((state) => state.admin.value);
    const handleTabChange = (value) => {
        onTabChange(value)
    }

    return (
        <div className="w-screen md:w-5/6">
            <Card className="mt-6 w-full">
                <CardBody>
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex flex-col">
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {title}
                            </Typography>
                            <Typography>
                                {description}
                            </Typography>
                        </div>
                        {(addButtonText === 'category' || addButtonText === 'sub category') &&
                            <Tabs value={0} className="w-96">
                                <TabsHeader className="bg-[#cae7df]">
                                    {TABS.map(({ label, value }) => (
                                        <Tab key={value} value={value} onClick={() => handleTabChange(value)}>
                                            &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                        </Tab>
                                    ))}
                                </TabsHeader>
                            </Tabs>
                        }
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <div className="flex flex-col gap-3 md:flex-row">
                        {showAddButton && (
                            <Button onClick={handleOpenAdd} className="flex items-center gap-3 rounded-2xl bg-[#41907a]" size="sm">
                                {addButtonText === 'admin' ?
                                    <>
                                        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add {addButtonText}
                                    </>
                                    :
                                    <>
                                        <IoMdAdd strokeWidth={2} className="h-4 w-4" /> Add {addButtonText}
                                    </>}
                            </Button>)}
                        <Button onClick={handleReset} variant="outlined" color="green" className="rounded-2xl">Reset Filter</Button>
                        <div className="w-full md:w-72 basis-1/2">
                            <Input
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}