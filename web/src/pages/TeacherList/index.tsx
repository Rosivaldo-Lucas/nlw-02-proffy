import React, { useState, FormEvent } from 'react';

import './styles.css';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [isPresentTeacher, setIsPresentTeacher] = useState(false);

  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(event: FormEvent) {
    event.preventDefault();

    const response = await api.get('/classes', {
      params: {
        subject,
        week_day: weekDay,
        time,
      },
    });

    setTeachers(response.data);

    if (response.data.length === 0) {
      setIsPresentTeacher(false);
    } else {
      setIsPresentTeacher(true);
    }
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis." >

        <form id="search-teachers" onSubmit={searchTeachers}>
        <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Fisica', label: 'Fisica' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Química', label: 'Química' },
              { value: 'Cálculo I', label: 'Cálculo I' },
              { value: 'Cálculo II', label: 'Cálculo II' },
            ]}
          />

          <Select
            name="week_day"
            label="Dia da semana"
            value={weekDay}
            onChange={(e) => setWeekDay(e.target.value)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />

          <Input
            name="time"
            label="Hora"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button type="submit">
            Buscar
          </button>
        </form>

      </PageHeader>

      <main>
        {
          isPresentTeacher
            ? (
              teachers.map((teacher: Teacher) => {
                return <TeacherItem key={teacher.id} teacher={teacher} />
              })
            )
            : (
              <div className="teacher-present">
                Nenhum professor encontrado com sua pesquisa.
              </div>
            )
        }
      </main>
    </div>
  );
}

export default TeacherList;
