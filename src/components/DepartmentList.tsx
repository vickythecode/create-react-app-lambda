import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
  name: string;
  subDepartments: string[];
}

const departments: Department[] = [
  {
    name: 'Engineering',
    subDepartments: ['Frontend', 'Backend', 'DevOps']
  },
  {
    name: 'Chef',
    subDepartments: ['Head', 'Sub', 'Students']
  },
  {
    name: 'Human Resources',
    subDepartments: ['Recruitment', 'Employee Relations']
  }
];

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const handleToggle = (name: string) => {
    setOpen({ ...open, [name]: !open[name] });
  };

  const handleSelect = (name: string, subDepartments: string[]) => {
    const allSelected = subDepartments.every(subDept => selected[subDept]);
    const newSelected = { ...selected, [name]: !selected[name] };

    subDepartments.forEach(subDept => {
      newSelected[subDept] = !allSelected;
    });

    setSelected(newSelected);
  };

  return (
    <List>
      {departments.map((department) => (
        <React.Fragment key={department.name}>
          <ListItem>
            <IconButton onClick={() => handleToggle(department.name)}>
              {open[department.name] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <Checkbox
              checked={selected[department.name] || false}
              indeterminate={
                department.subDepartments.some(subDept => selected[subDept]) &&
                !department.subDepartments.every(subDept => selected[subDept])
              }
              onChange={() => handleSelect(department.name, department.subDepartments)}
            />
            <ListItemText primary={department.name} />
          </ListItem>
          {open[department.name] && department.subDepartments.map((subDept) => (
            <ListItem key={subDept} sx={{ pl: 4 }}>
              <Checkbox
                checked={selected[subDept] || false}
                onChange={() => setSelected({ ...selected, [subDept]: !selected[subDept] })}
              />
              <ListItemText primary={subDept} />
            </ListItem>
          ))}
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
