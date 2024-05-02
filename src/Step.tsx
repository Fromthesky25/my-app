import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Category from "./Category";

import "./Step.css";

const protein = [
  "Кальмар",
  "Курица",
  "Тунец",
  "Морской гребешок",
  "Морской микс",
  "Коктейльные креветки",
  "Лосоль",
  "Угорь",
  "Лосось-тунец",
  "Телятина",
  "Краб",
  "Тофу",
  "Свинина",
  "Креветка",
];

const main = ["Удон", "Рис", "Айсберг", "Соба", "Киноа", "Киноа + рис"];

const sauce = [
  "Манго-маракуйя",
  "Том-ям",
  "Цезарь",
  "Японский",
  "Медово-горничный",
  "Спайси",
  "Карри",
  "Сладкий чили",
  "Терияки",
];

const crunch = [
  "Тыквенные семечки",
  "Арахис",
  "Кешью",
  "Начос",
  "Нори",
  "Миндальные лепестки",
  "Кукуруза жаренная",
  "Кунжут",
  "Жареный лук",
];

const steps = [
  {
    id: "protein",
    label: "Выберите протеин",
    img: "https://mnogoribi.ru/image/c-poke-step1.png",
    categories: protein,
  },
  {
    id: "main",
    label: "Выберите основу",
    img: "https://mnogoribi.ru/image/c-poke-step2.png",
    categories: main,
  },
  // {
  //   id: 'filler',
  //   label: 'Наполнитель',
  //   img: 'https://mnogoribi.ru/image/c-poke-step3.png',
  //   categories: filler
  // },
  // {
  //   id: 'topping',
  //   label: 'Топпинг',
  //   img: 'https://mnogoribi.ru/image/c-poke-step4.png',
  //   categories: filler
  // },
  {
    id: "sauce",
    label: "Соус",
    img: "https://mnogoribi.ru/image/c-poke-step5.png",
    categories: sauce,
  },
  {
    id: "crunch",
    label: "Хруст",
    img: "https://mnogoribi.ru/image/c-poke-step6.png",
    categories: crunch,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [protein, setProtein] = useState<string | null>(null);
  const [main, setMain] = useState<string | null>(null);
  const [filler, setFiller] = useState<string | null>(null);
  const [topping, setTopping] = useState<string | null>(null);
  const [sauce, setSauce] = useState<string | null>(null);
  const [crunch, setCrunch] = useState<string | null>(null);

  const handleCategoryChange = (id: string, value: string) => {
    switch (id) {
      case "protein":
        setProtein(value);
        break;
      case "main":
        setMain(value);
        break;
      case "filler":
        setFiller(value);
        break;
      case "topping":
        setTopping(value);
        break;
      case "sauce":
        setSauce(value);
        break;
      case "crunch":
        setCrunch(value);
        break;
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setProtein(null);
    setMain(null);
    setFiller(null);
    setTopping(null);
    setSauce(null);
    setCrunch(null);
  };

  const optionalCheck = (id: string) => {
    let res;
    switch (id) {
      case "protein":
        res = protein;
        break;
      case "main":
        res = main;
        break;
      case "filler":
        res = filler;
        break;
      case "topping":
        res = topping;
        break;
      case "sauce":
        res = sauce;
        break;
      case "crunch":
        res = crunch;
        break;
    }
    if (res) {
      return <Typography variant="caption">{res}</Typography>;
    }
    return null;
  };

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={index < activeStep ? optionalCheck(step.id) : null}
              icon={<img src={step.img} alt="" />}>
              <div className="step__label">{step.label}</div>
            </StepLabel>
            <StepContent>
              <Box sx={{ mb: 2 }}>
                <Category
                  categories={step.categories}
                  onChange={(value: string) => {
                    handleCategoryChange(step.id, value);
                  }}
                />
                <Box>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={!optionalCheck(step.id)}>
                    {index === steps.length - 1 ? "Закончить" : "Далее"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}>
                    Назад
                  </Button>
                </Box>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Вы собрали свой идеальный поке</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            В корзину
          </Button>
        </Paper>
      )}
    </Box>
  );
}
