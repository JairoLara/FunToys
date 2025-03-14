<template>
  <AdminNav />
  <div class="favoritos-container">
    <!-- Lista de clientes -->
    <div v-if="clientes.length > 0" class="clientes-list">
      <h3>Clientes</h3>
      <ul>
        <li v-for="cliente in clientes" :key="cliente.id">
          <button @click="seleccionarCliente(cliente.id)">{{ cliente.nombre }}</button>
        </li>
      </ul>
    </div>

    <!-- Mostrar pedidos de un cliente -->
    <div v-if="pedidosAbiertos && pedidos.length > 0" class="pedidos-list">
      <h3>Pedidos de {{ nombreCliente }}</h3>

      <div v-for="pedido in pedidos" :key="pedido.id" class="pedido-item">
        <div class="pedido-info">
          <p><strong>Juguete:</strong> {{ pedido.juguete.nombre }}</p>
          <p><strong>Cantidad:</strong> {{ pedido.cantidad }}</p>
          <p><strong>Total:</strong> ${{ pedido.total }}</p>
          <p><strong>Fecha:</strong> {{ new Date(pedido.fecha).toLocaleString() }}</p>
        </div>

        <!-- Formulario para cambiar estado de entrega -->
        <div class="estado-entrega">
          <label for="estadoEntrega">Estado de Entrega:</label>
          <select v-model="pedido.estadoEntrega" id="estadoEntrega" @change="actualizarEstado(pedido.id, pedido.estadoEntrega)">
            <option value="en espera">En espera</option>
            <option value="en proceso">En proceso</option>
            <option value="entregado">Entregado</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import AdminNav from '@/components/admin/AdminNav.vue';

export default {
  components: {
    AdminNav
  },
  setup() {
    const clientes = ref([]);
    const pedidos = ref([]);
    const nombreCliente = ref('');
    const pedidosAbiertos = ref(false);

    const obtenerClientes = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/clientes');
        clientes.value = response.data;
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };

    const obtenerPedidosPorCliente = async (clienteId) => {
      try {
        const response = await axios.get(`http://localhost:7000/api/pedidos/cliente/${clienteId}`);
        pedidos.value = response.data;
        pedidosAbiertos.value = true; // Mostrar pedidos al seleccionar un cliente
        const cliente = clientes.value.find(c => c.id === clienteId);
        nombreCliente.value = cliente ? cliente.nombre : 'Cliente no encontrado';
      } catch (error) {
        console.error("Error al obtener los pedidos del cliente:", error);
      }
    };

    const actualizarEstado = async (pedidoId, nuevoEstado) => {
      try {
        const response = await axios.put(`http://localhost:7000/api/pedidos/${pedidoId}`, {
          estadoEntrega: nuevoEstado
        });
        console.log("Pedido actualizado:", response.data);
      } catch (error) {
        console.error("Error al actualizar el estado del pedido:", error);
      }
    };

    const seleccionarCliente = (clienteId) => {
      obtenerPedidosPorCliente(clienteId);
    };

    const cerrarPedidos = (event) => {
      // Verifica si el clic fue fuera de la lista de pedidos
      if (!event.target.closest('.pedidos-list') && !event.target.closest('.clientes-list')) {
        pedidosAbiertos.value = false;
        pedidos.value = [];
      }
    };

    onMounted(() => {
      obtenerClientes();
      document.addEventListener('click', cerrarPedidos);
    });

    onUnmounted(() => {
      document.removeEventListener('click', cerrarPedidos);
    });

    return {
      clientes,
      pedidos,
      nombreCliente,
      pedidosAbiertos,
      seleccionarCliente,
      actualizarEstado
    };
  }
};
</script>

<style scoped>
.favoritos-container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #FFFFFF;
  padding: 20px;
}

.clientes-list {
  width: 250px;
  background: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.clientes-list ul {
  list-style: none;
  padding: 0;
}

.clientes-list li {
  margin-bottom: 10px;
}

.clientes-list button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.clientes-list button:hover {
  background-color: #0056b3;
}

/* Contenedor de pedidos */
.pedidos-list {
  flex: 1;
  margin-left: 20px;
}

.pedido-item {
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.pedido-info {
  text-align: left;
  margin-bottom: 10px;
}
</style>
