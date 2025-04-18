import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Steps } from "@/components/ui/Steps";

function NewUserConfig() {
    const [step, setStep] = useState<number>(1);

    const [userForm, setUserForm] = useState<any>({});

    const changeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        const { name, value } = target;
        setUserForm((user) => ({ ...user, [name]: value }));
    };
    const steps = [
        { title: "Name", description: "Basic Info" },
        { title: "Costs", description: "Details" },
        { title: "Check", description: "Review" },
        // { title: "Step 4", description: "Submit" },
    ];

    const convertObjToArr = () => {
        let tmp = [];
        for (const key in userForm) {
            tmp.push({ name: key, value: userForm[key] });
        }
        return tmp;
    };

    const stepsContent = {
        1: (
            <div className="space-y-2">
                <Label htmlFor="description">Please insert Your Shop Name</Label>
                <Input onChange={changeUser} name="storeName" placeholder="My Shop" />
            </div>
        ),
        2: (
            <div className="flex flex-col justify-center items-center">
                <Label className="py-8 text-xl"> Please Insert your Running costs here !</Label>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="description">Rental</Label>
                        <Input onChange={changeUser} name="rental" placeholder="20 000" />
                    </div>
                    <div className="space-y-2">
                        <Label className="capitalize" htmlFor="Employes">
                            Employes
                        </Label>
                        <Input onChange={changeUser} name="employes" placeholder="40 000" />
                    </div>
                    <div className="space-y-2">
                        <Label className="capitalize" htmlFor="communication">
                            communication
                        </Label>
                        <Input onChange={changeUser} name="communication" placeholder="8 000" />
                    </div>
                    <div className="space-y-2">
                        <Label className="capitalize" htmlFor="developement">
                            developement
                        </Label>
                        <Input onChange={changeUser} name="developement" placeholder="100 000" />
                    </div>
                    <div className="space-y-2">
                        <Label className="capitalize" htmlFor="transportation">
                            transportation
                        </Label>
                        <Input onChange={changeUser} name="transportation" placeholder="6 000" />
                    </div>
                    <div className="space-y-2">
                        <Label className="capitalize" htmlFor="other">
                            other
                        </Label>
                        <Input onChange={changeUser} name="other" placeholder="6 580" />
                    </div>
                </div>
            </div>
        ),
        3: (
            <div className="flex flex-col justify-center items-center">
                <Label className="py-8 text-xl capitalize"> Check your informations</Label>
                <div className="grid grid-cols-2 gap-4">
                    {convertObjToArr().map((el, i) => {
                        return (
                            <div className="space-y-2">
                                <Label className="capitalize" htmlFor="description">
                                    {el.name}{" "}
                                </Label>
                                <Input className="text-black" value={formatToDZD(el.value)} />
                            </div>
                        );
                    })}
                </div>
            </div>
        ),
    };
    function formatToDZD(value: string): string {
        const num = parseFloat(value);

        if (isNaN(num)) {
            return value;
        }

        return new Intl.NumberFormat("fr-DZ", {
            style: "currency",
            currency: "DZD",
            minimumFractionDigits: 0,
        })
            .format(num)
            .toString();
    }

    return (
        <div className="w-100% h-[100vh] bg-gray-100 flex flex-col gap-4 items-center pt-24">
            <Steps currentStep={step} steps={steps} />
            <Card className="w-60% h-60% px-14 py-8 bg-white flex flex-col justify-center items-center gap-4 ">
                {stepsContent[step]}
                <div className=" flex gap-20 items-center">
                    {step > 1 && (
                        <Button
                            variant="outline"
                            className="capitalize flex justify-center items-center"
                            onClick={() => {
                                setStep((stp) => (stp -= 1));
                            }}
                        >
                            <ChevronDownIcon style={{ transform: "rotate(90deg)" }} />
                            <span className="capitalize flex justify-center items-center">previous</span>
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        className="capitalize flex justify-center items-center"
                        onClick={() => {
                            setStep((stp) => (stp += 1));
                        }}
                    >
                        {step < 3 && <ChevronDownIcon style={{ transform: "rotate(-90deg)" }} />}
                        <span className="capitalize flex justify-center items-center">{step == 3 ? "Submit" : "next"}</span>
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default NewUserConfig;
