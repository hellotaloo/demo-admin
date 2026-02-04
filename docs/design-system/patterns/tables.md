# Table Patterns

Guidelines and patterns for building data tables in the Taloo application.

## Using DataTable Component

The preferred way to build tables is using the `DataTable` component from `/components/kit/data-table/`.

### Basic DataTable

```tsx
import { DataTable, DataTableHeader, DataTableBody, DataTableEmpty } from '@/components/kit/data-table';
import type { Column } from '@/components/kit/data-table';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const columns: Column<User>[] = [
  { key: 'name', header: 'Naam', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Rol', sortable: false },
];

<DataTable data={users} columns={columns}>
  <DataTableHeader />
  <DataTableBody
    emptyState={
      <DataTableEmpty
        title="Geen gebruikers"
        description="Er zijn geen gebruikers gevonden"
      />
    }
  />
</DataTable>
```

### Custom Column Rendering

```tsx
const columns: Column<Vacancy>[] = [
  {
    key: 'title',
    header: 'Titel',
    sortable: true,
  },
  {
    key: 'status',
    header: 'Status',
    render: (vacancy) => <StatusBadge isOnline={vacancy.isOnline} />,
  },
  {
    key: 'channels',
    header: 'Kanalen',
    render: (vacancy) => <ChannelIcons channels={vacancy.channels} />,
  },
  {
    key: 'applicants',
    header: 'Sollicitanten',
    accessor: (vacancy) => vacancy.applications.length,
    sortable: true,
    className: 'text-right',
  },
  {
    key: 'actions',
    header: '',
    render: (vacancy) => (
      <Button size="sm" variant="ghost">
        Bekijken
      </Button>
    ),
    className: 'w-[100px]',
  },
];
```

### Clickable Rows

```tsx
<DataTable
  data={items}
  columns={columns}
  selectedId={selectedId}
  onRowClick={(item) => {
    setSelectedId(item.id);
    navigate(`/edit/${item.id}`);
  }}
>
  <DataTableHeader />
  <DataTableBody />
</DataTable>
```

### Default Sorting

```tsx
<DataTable
  data={users}
  columns={columns}
  defaultSortKey="createdAt"
  defaultSortDirection="desc"
>
  <DataTableHeader />
  <DataTableBody />
</DataTable>
```

## Table Layouts

### Standard Table Layout

```tsx
<div className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold">Gebruikers</h2>
    <Button>Nieuwe gebruiker</Button>
  </div>

  <DataTable data={users} columns={columns}>
    <DataTableHeader />
    <DataTableBody emptyState={<DataTableEmpty />} />
  </DataTable>
</div>
```

### Table with Filters

```tsx
<div className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold">Vacatures</h2>
    <div className="flex gap-3">
      <Input
        placeholder="Zoeken..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-[250px]"
      />
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-[150px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle</SelectItem>
          <SelectItem value="active">Actief</SelectItem>
          <SelectItem value="draft">Concept</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>

  <DataTable data={filteredVacancies} columns={columns}>
    <DataTableHeader />
    <DataTableBody />
  </DataTable>
</div>
```

### Table with Tabs

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="active">Actief</TabsTrigger>
    <TabsTrigger value="draft">Concept</TabsTrigger>
    <TabsTrigger value="archived">Gearchiveerd</TabsTrigger>
  </TabsList>

  <TabsContent value="active" className="space-y-4">
    <DataTable data={activeVacancies} columns={columns}>
      <DataTableHeader />
      <DataTableBody />
    </DataTable>
  </TabsContent>

  <TabsContent value="draft" className="space-y-4">
    <DataTable data={draftVacancies} columns={columns}>
      <DataTableHeader />
      <DataTableBody />
    </DataTable>
  </TabsContent>

  <TabsContent value="archived" className="space-y-4">
    <DataTable data={archivedVacancies} columns={columns}>
      <DataTableHeader />
      <DataTableBody />
    </DataTable>
  </TabsContent>
</Tabs>
```

## Column Patterns

### Text Column

```tsx
{
  key: 'name',
  header: 'Naam',
  sortable: true,
}
```

### Numeric Column (Right-Aligned)

```tsx
{
  key: 'count',
  header: 'Aantal',
  sortable: true,
  className: 'text-right',
  accessor: (item) => item.applications.length,
}
```

### Date Column

```tsx
{
  key: 'createdAt',
  header: 'Aangemaakt',
  sortable: true,
  render: (item) => (
    <span className="text-sm text-gray-500">
      {formatDate(item.createdAt)}
    </span>
  ),
  accessor: (item) => new Date(item.createdAt),
}
```

### Status Column

```tsx
{
  key: 'status',
  header: 'Status',
  render: (item) => <StatusBadge isOnline={item.isOnline} />,
  className: 'w-[120px]',
}
```

### Badge Column

```tsx
{
  key: 'priority',
  header: 'Prioriteit',
  render: (item) => (
    <Badge variant={item.priority === 'high' ? 'destructive' : 'secondary'}>
      {item.priority}
    </Badge>
  ),
}
```

### Actions Column

```tsx
{
  key: 'actions',
  header: '',
  render: (item) => (
    <div className="flex gap-2 justify-end">
      <Button
        size="sm"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation(); // Prevent row click
          handleEdit(item);
        }}
      >
        Bewerken
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(item);
        }}
      >
        Verwijderen
      </Button>
    </div>
  ),
  className: 'w-[200px] text-right',
}
```

### Avatar Column

```tsx
{
  key: 'user',
  header: 'Gebruiker',
  render: (item) => (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={item.avatar} />
        <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">{item.name}</p>
        <p className="text-xs text-gray-500">{item.email}</p>
      </div>
    </div>
  ),
}
```

## Empty States

### Standard Empty State

```tsx
<DataTableEmpty
  icon={Inbox}
  title="Geen data"
  description="Er zijn geen items om weer te geven"
/>
```

### Empty State with Action

```tsx
<DataTableEmpty
  icon={Users}
  title="Geen gebruikers"
  description="Begin met het toevoegen van gebruikers"
  action={
    <Button onClick={() => setDialogOpen(true)}>
      Gebruiker toevoegen
    </Button>
  }
/>
```

### Custom Empty State

```tsx
<DataTableEmpty
  icon={Search}
  title="Geen resultaten"
  description={`Geen resultaten gevonden voor "${searchQuery}"`}
  action={
    <Button variant="outline" onClick={() => setSearch('')}>
      Wis zoekopdracht
    </Button>
  }
/>
```

## Row States

### Hover State

Automatically applied by DataTable when `onRowClick` is provided.

### Selected Row

```tsx
<DataTable
  data={items}
  columns={columns}
  selectedId={selectedId}
  onRowClick={(item) => setSelectedId(item.id)}
>
  {/* Selected row gets blue background */}
</DataTable>
```

### Custom Row Styling

```tsx
<DataTable
  data={items}
  columns={columns}
>
  <DataTableHeader />
  <DataTableBody
    rowClassName={(item) => cn(
      item.priority === 'high' && 'bg-red-50',
      item.isNew && 'font-semibold'
    )}
  />
</DataTable>
```

## Loading States

### Skeleton Loading

```tsx
{isLoading ? (
  <div className="space-y-2">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="animate-pulse flex gap-4 p-4">
        <div className="h-4 bg-gray-200 rounded flex-1"></div>
        <div className="h-4 bg-gray-200 rounded flex-1"></div>
        <div className="h-4 bg-gray-200 rounded flex-1"></div>
      </div>
    ))}
  </div>
) : (
  <DataTable data={data} columns={columns}>
    <DataTableHeader />
    <DataTableBody />
  </DataTable>
)}
```

### Loading Overlay

```tsx
<div className="relative">
  <DataTable data={data} columns={columns}>
    <DataTableHeader />
    <DataTableBody />
  </DataTable>

  {isLoading && (
    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  )}
</div>
```

## Pagination

```tsx
<div className="space-y-4">
  <DataTable data={paginatedData} columns={columns}>
    <DataTableHeader />
    <DataTableBody />
  </DataTable>

  <div className="flex items-center justify-between">
    <p className="text-sm text-gray-500">
      {startIndex + 1}-{endIndex} van {totalItems}
    </p>
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Vorige
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Volgende
      </Button>
    </div>
  </div>
</div>
```

## Responsive Tables

### Hide Columns on Mobile

```tsx
const columns: Column<Item>[] = [
  { key: 'name', header: 'Naam' },
  { key: 'email', header: 'Email', className: 'hidden md:table-cell' },
  { key: 'role', header: 'Rol', className: 'hidden lg:table-cell' },
  { key: 'actions', header: '' },
];
```

### Mobile Card View

```tsx
{isMobile ? (
  <div className="space-y-3">
    {items.map((item) => (
      <Card key={item.id} className="p-4">
        <div className="space-y-2">
          <p className="font-semibold">{item.name}</p>
          <p className="text-sm text-gray-500">{item.email}</p>
          <div className="flex gap-2 pt-2">
            <Button size="sm">Bekijken</Button>
          </div>
        </div>
      </Card>
    ))}
  </div>
) : (
  <DataTable data={items} columns={columns}>
    <DataTableHeader />
    <DataTableBody />
  </DataTable>
)}
```

## Best Practices

**Do:**
- Use DataTable component for consistency
- Keep column count reasonable (5-8 max on desktop)
- Right-align numeric columns
- Provide empty states with helpful messages
- Use custom renderers for complex cell content
- Add actions column on the right
- Make row hover states visible when clickable

**Don't:**
- Put too much content in table cells
- Use tables for mobile-first layouts
- Nest tables
- Make action buttons too large
- Forget loading states
- Hide important columns on mobile without alternative view
- Use table for list items (use list components instead)
