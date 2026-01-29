'use client';

import { useState, useMemo } from 'react';
import { Heading, Text, Flex, TextField, Select, Button } from '@radix-ui/themes';
import { Search, Plus, Filter } from 'lucide-react';
import { VacancyList } from '@/components/vacancies/VacancyList';
import { dummyVacancies } from '@/lib/dummy-data';

export default function VacanciesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredVacancies = useMemo(() => {
    return dummyVacancies.filter((vacancy) => {
      const matchesSearch = 
        vacancy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vacancy.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vacancy.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || vacancy.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Flex justify="between" align="center">
        <div>
          <Heading size="6" className="text-[var(--text-primary)]">
            Vacancies
          </Heading>
          <Text size="2" className="text-[var(--text-secondary)]">
            Manage your job vacancies and create AI agents
          </Text>
        </div>
        <Button size="2" className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4" />
          Add Vacancy
        </Button>
      </Flex>

      {/* Filters */}
      <Flex gap="3" align="center">
        <div className="flex-1 max-w-sm">
          <TextField.Root 
            placeholder="Search vacancies..." 
            size="2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          >
            <TextField.Slot>
              <Search className="w-4 h-4 text-[var(--text-secondary)]" />
            </TextField.Slot>
          </TextField.Root>
        </div>
        
        <Select.Root value={statusFilter} onValueChange={setStatusFilter}>
          <Select.Trigger placeholder="Filter by status" />
          <Select.Content>
            <Select.Item value="all">All Status</Select.Item>
            <Select.Item value="new">New</Select.Item>
            <Select.Item value="in_progress">In Progress</Select.Item>
            <Select.Item value="agent_created">Agent Created</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>

      {/* Results count */}
      <Text size="2" className="text-[var(--text-secondary)]">
        Showing {filteredVacancies.length} of {dummyVacancies.length} vacancies
      </Text>

      {/* Vacancy Grid */}
      <VacancyList vacancies={filteredVacancies} />
    </div>
  );
}
